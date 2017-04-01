'use strict';

const restify = require('restify');
const builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
// var connector = new builder.ChatConnector({
//     appId: process.env.MICROSOFT_APP_ID,
//     appPassword: process.env.MICROSOFT_APP_PASSWORD
// });

var connector = new builder.ChatConnector({
    appId: '919f59d6-cee8-4e20-8f63-32bd92005d07',
    appPassword: 'fDkoLLf2v89rLmrJm9unK2M'
});

var bot = new builder.UniversalBot(connector);
var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/76fbffec-6677-4f37-a09f-c52cc160c047?subscription-key=94c91f8f3a0d46d6bb516227bd208728&verbose=true&timezoneOffset=0.0');
var intents = new builder.IntentDialog({
    recognizers: [recognizer],
    intentThreshold: 0.8
});
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', intents);

intents.matches('WELCOME', function (session) {
    session.send('Hello!');

    // create reply with Carousel AttachmentLayout
    var reply = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments([{
            title: 'um',
            text: ' subum',
            buttons: [{
                value: "https://en.wikipedia.org/wiki/Pig_Latin",
                title: "CLIQUE AQUI",
                type: "openUrl"
            }],
            images: [{
                url: 'https://dummyimage.com/600x300'
            }],
            tap: 'BYE'
        }, {
            title: 'dois',
            text: 'subdois',
            tap: 'PAGAMENTO'
        }]);

    session.send(reply);
});

intents.matches('PEDIDOS_MODELO');
intents.matches('PROMOCAO', (s) => {

});
intents.matches('PAGAMENTO');
intents.matches('LANCAMENTO');
intents.matches('PRESENTE');

intents.matches('BYE', function (session) {
    session.send('Bye!');
});

intents.onDefault((session) => {
    console.log(session, intents);
    session.send('Desculpe nao entendi');
});