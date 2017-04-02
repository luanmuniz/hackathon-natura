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
    recognizers: [ recognizer ],
    intentThreshold: 0.7
});
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', intents);

intents.matches('00000000000000000000', cenarioUm.init);
intents.matches('11111111111111111111', cenarioUm.promocao);
intents.matches('22222222222222222222', cenarioUm.promocao_um);
intents.matches('33333333333333333333', cenarioUm.promocao_dois);
intents.matches('44444444444444444444', cenarioUm.promocao_tres);

intents.matches('55555555555555555555', cenarioTres.init);
intents.matches('66666666666666666666', cenarioTres.presente);
intents.matches('77777777777777777777', cenarioTres.presente_dois);
intents.matches('88888888888888888888', cenarioTres.presente_tres);
intents.matches('99999999999999999999', cenarioTres.presente_quatro);

intents.matches('WELCOME', cenarioQuatro.init);
intents.matches('PROMOCAO', cenarioQuatro.promocao);
intents.matches('LANCAMENTO', cenarioQuatro.lancamento);
intents.matches('PRESENTE', cenarioQuatro.presente);
intents.matches('MODELO', cenarioQuatro.modelo);
intents.matches('MODELO_55555', cenarioQuatro.modelo_cinco);
intents.matches('OBRIGADO', cenarioQuatro.obrigado);
intents.matches('PEDIDO', cenarioQuatro.pedido);

intents.onDefault((session, args) => {
    session.send('Desculpe nao entendi');
});