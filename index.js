'use strict';

const restify = require('restify');
const builder = require('botbuilder');
const promocoes = require('./promocoes');
const promocoes = require('./helper');
const got = require('got')

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: '919f59d6-cee8-4e20-8f63-32bd92005d07',
    appPassword: 'fDkoLLf2v89rLmrJm9unK2M'
});

var bot = new builder.UniversalBot(connector);
var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/76fbffec-6677-4f37-a09f-c52cc160c047?subscription-key=94c91f8f3a0d46d6bb516227bd208728&verbose=true&timezoneOffset=0.0');
var intents = new builder.IntentDialog({
    recognizers: [ recognizer ],
    intentThreshold: 0.7
});
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', intents);
bot.dialog('/bye', (s) => {
    s.send('Byes!');
    s.endDialog();
});

intents.matches('PROMOCAO', '/promocao');
bot.dialog('/promocao', promocoes.promocao);
bot.dialog('/promocao_um', promocoes.promocao_um);
bot.dialog('/promocao_dois', promocoes.promocao_dois);
bot.dialog('/promocao_tres', promocoes.promocao_tres);

intents.matches('WELCOME', (s) => {
    s.send('Oi Ana, tudo bom? Vi que você tem 39 pontos e faltam apenas 11 para você completar o seu pedido! Posso te mostrar promoções, lançamentos e presentes? Escolha uma opção.')

    helper.sendSlider([
        {
            "title": "Promoções",
            "subtitle": "Promoções",
            "images": [
                { "url": "https://dummyimage.com/600x300" }
            ],
            "buttons": [{
                "type": "postBack",
                "title": "Ver promoções",
                "value": "PROMOCAO"
            }]
        }, {
            "title": "Presentes",
            "subtitle": "Presentes",
            "images": [
                { "url": "https://dummyimage.com/600x300" }
            ],
            "buttons": [{
                "type": "postBack",
                "title": "Ver presentes",
                "value": "PRESENTE"
            }]
        }
    }, {
            "title": "Lançamento",
            "subtitle": "Lançamento",
            "images": [
                { "url": "https://dummyimage.com/600x300" }
            ],
            "buttons": [{
                "type": "postBack",
                "title": "Ver lançamento",
                "value": "LANCAMENTO"
            }]
        }
    ]);
});

intents.matches('PEDIDOS_MODELO', (s) => s.send('PEDIDOS_MODELOS'));

intents.matches('PAGAMENTO', (s) => s.send('PAGAMENTOS'));
intents.matches('LANCAMENTO', (s) => s.send('LANCAMENTOS'));
intents.matches('PRESENTE', (s) => {
    got.post("https://search.oppuz.com/natura/api/search/v2", {
        "text": "presente",
        "pageSize": 1,
        "token": "27c7ea9af3f1d3657bc810d2"
    })
    s.send('presentes!')
});
intents.matches('BYE', '/bye');

intents.onDefault((session, args) => {
    console.log(args);
    session.send('Desculpe nao entendi');
});