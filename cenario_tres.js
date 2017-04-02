const builder = require('botbuilder');
const helper = require('./helper');

module.exports = {

	init(s) {
		s.send('Oi Maria, tudo bom? Vi que você tem 12 pontos e faltam 38 para você completar o seu pedido! Posso te mostrar promoções, lançamentos e presentes? Escolha uma opção.')

	    helper.sendSlider(s, [
	        {
	            "title": "Promoções",
	            "subtitle": "Promoções",
	            "images": [
	                { "url": "https://dummyimage.com/600x300" }
	            ],
	            "buttons": [{
	                "type": "postBack",
	                "title": "Ver presentes",
	                "value": "11111111111111111111"
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
	                "value": "66666666666666666666"
	            }]
	        }, {
	            "title": "Lançamento",
	            "subtitle": "Lançamento",
	            "images": [
	                { "url": "https://dummyimage.com/600x300" }
	            ],
	            "buttons": [{
	                "type": "postBack",
	                "title": "Ver lançamento",
	                "value": ""
	            }]
	        }
	    ]);
	},

	presente(s) {
		s.send('Legal! Você escolheu presentes! Aqui estão duas indicações que escolhemos especialmente para te ajudar a você passar o pedido de 50 pontos ou mais!');

		session.sendTyping();
		got({
			url: 'http://40.71.226.49/rec/sortOffers?store=natura&field=price&q=%7B%22metadata%22%3A%7B%22natura%22%3A%22Presente%22%7D%7D',
			headers: {
				'Authorization': 'adcfdecda123491231afddaee'
			}
		}).then((result) => {
			let arrayToSend = [];

			result.forEach((thisPresente) => {
				arrayToSend.push({
		            title: thisPresente.name,
		            images: [ { url: thisPresente.img } ],
		            buttons: [{
		                type: "postBack",
		                title: "Ver lançamento",
		                value: "77777777777777777777"
		            }]
		        });
			});

			helper.sendSlider(s, arrayToSend);
		})
	},

	presente_dois(s) {
		s.send('Ótima escolha! Quer ainda aumentar suas vendas e passar um pedido de 80 pontos ou mais? Posso te ajudar a montar um pedido especial para você e te mostrar promoções, lançamentos e presentes. Escolha uma opção. ');

		session.sendTyping();
		// Integracao pedidos pessoal, eles estão pendentes
	},

	presente_tres(s) {
		s.send('Tudo bem! Analisamos que você nos últimos ciclos você teve dificuldades em montar o seu pedido. Lembre-se que após 6 ciclos sem pedido você se torna uma Consultora Inativa!');
		s.send('Precisa de mais alguma ajuda? É só perguntar!')
	},

	presente_quatro(s) {
		s.send('É e sempre será prazer em ajudar, Maria! Boas vendas!')
	}

}