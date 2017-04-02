'use strict';

const restify = require('restify');
const builder = require('botbuilder');
const helper = require('./helper');
const got = require('got');

const cenarioUm = require('./cenario_um');
const cenarioTres = require('./cenario_tres');
const cenarioQuatro = require('./cenario_quatro');

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
    recognizers: [recognizer],
    intentThreshold: 0.7
});
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', (s) => {
    if (s.message.text.includes('INTENT_')) {
        let intentName = s.message.text.replace('INTENT_', '').toLowerCase();
        return s.replaceDialog(`/${intentName}`);
    }

    s.replaceDialog(`/intents`);
});

bot.dialog('/intents', intents);

global.actualIntent = '';

intents.matches('ABANDONO', cenarioUm.init);
bot.dialog('/promocao_um', cenarioUm.promocao);
bot.dialog('/promocao_dois', cenarioUm.promocao_um);
bot.dialog('/promocao_tres', cenarioUm.promocao_dois);
bot.dialog('/promocao_quatro', cenarioUm.promocao_tres);

intents.matches('WELCOME', cenarioQuatro.init);
intents.matches('PROMOCAO', cenarioQuatro.selecionarCategoria);
intents.matches('LANCAMENTO', cenarioQuatro.selecionarCategoria);
intents.matches('PRESENTE', cenarioQuatro.produto);

intents.matches('PERFUME', cenarioQuatro.produto);
intents.matches('HIDRATANTE', cenarioQuatro.produto);
intents.matches('SHAMPOO', cenarioQuatro.produto);

intents.matches('VENDIDO', cenarioQuatro.vendido);

intents.matches('OBRIGADO', cenarioQuatro.obrigado);
///
bot.dialog('/categoria_add', cenarioQuatro.categoria_add);

intents.onDefault((session, args) => {
    session.send('Desculpe nao entendi');
});