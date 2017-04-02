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

bot.dialog('/', (s) => {
	if(s.message.text.includes('INTENT_')) {
		let intentName = s.message.text.replace('INTENT_', '').toLowerCase();
		return s.replaceDialog(`/${intentName}`);
	}

	s.replaceDialog(`/intents`);
});

bot.dialog('/intents', intents);

// intents.matches('WELCOME', cenarioUm.init);
// intents.matches('00000000000000000000', cenarioUm.init);
// bot.dialog('/promocao_um', cenarioUm.promocao);
// bot.dialog('/promocao_dois', cenarioUm.promocao_um);
// bot.dialog('/promocao_tres', cenarioUm.promocao_dois);
// bot.dialog('/promocao_quatro', cenarioUm.promocao_tres);

intents.matches('11111111111111111111', cenarioTres.init);
bot.dialog('/presente_um', cenarioTres.presente);
bot.dialog('/presente_dois', cenarioTres.presente_dois);
bot.dialog('/presente_tres', cenarioTres.presente_tres);
bot.dialog('/presente_quatro', cenarioTres.presente_quatro);

intents.matches('WELCOME', cenarioQuatro.init);
intents.matches('PROMOCAO', cenarioQuatro.promocao);
bot.dialog('/promocao_add', cenarioQuatro.promocao_add);
intents.matches('LANCAMENTO', cenarioQuatro.lancamento);
intents.matches('PRESENTE', cenarioQuatro.presente);
intents.matches('MODELO', cenarioQuatro.modelo);
bot.dialog('/modelo_5', cenarioQuatro.modelo_cinco);
intents.matches('OBRIGADO', cenarioQuatro.obrigado);
intents.matches('PEDIDO', cenarioQuatro.pedido);

intents.onDefault((session, args) => {
    session.send('Desculpe nao entendi');
});