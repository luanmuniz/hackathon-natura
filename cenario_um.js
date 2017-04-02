const builder = require('botbuilder');
const helper = require('./helper');
const got = require('got');

module.exports = {

	init(s) {
		s.send('Oi Maria, tudo bom? Vi que você tem 39 pontos e faltam apenas 11 para você completar o seu pedido! Posso te mostrar promoções, lançamentos e presentes? Escolha uma opção.')

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
	                "value": "INTENT_PROMOCAO_UM"
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
	                "value": "55555555555555555555"
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

	    s.endDialog();
	},

	async promocao(s) {
		s.send('Legal! Você escolheu promoções! Aqui estão duas indicações que escolhemos especialmente para te ajudar a você passar o pedido de 50 pontos ou mais!');

		s.sendTyping();
		let apiResult = await got('http://40.71.226.49/rec/sortOffers?store=natura&field=price&q=%7B%22metadata%22%3A%7B%22natura%22%3A%22Promo%C3%A7%C3%A3o%22%7D%7D', {
			headers: { 'Authorization': 'adcfdecda123491231afddaee' }
		});

		let arrayToSend = [];

		JSON.parse(apiResult.body).forEach((thisPresente) => {
			arrayToSend.push({
	            title: thisPresente.name,
	            images: [ { url: thisPresente.img } ],
	            buttons: [{
	                type: "postBack",
	                title: "Ver Promoção",
	                value: "INTENT_PROMOCAO_DOIS"
	            }, {
	                type: "postBack",
	                title: "Adicionar ao carrinho",
	                value: "INTENT_PROMOCAO_DOIS"
	            }]
	        });
		});

		helper.sendSlider(s, arrayToSend);
		s.endDialog();
	},

	promocao_um(s) {
		s.send('Ótima escolha! Quer ainda aumentar suas vendas e passar um pedido de 80 pontos ou mais? Posso te ajudar a montar um pedido especial para você e te mostrar promoções, lançamentos e presentes. Escolha uma opção.');

		helper.sendSlider(s, [{
			"title": "Mais 41 pontos",
			"subtitle": "Você paga R$ 663 em 3x no boleto e pode Vender por até R$ 893!",
			"images": [
				{ "url": "https://dummyimage.com/600x300" }
			],
			"buttons": [{
				"type": "postBack",
				"title": "Ver promoções",
				"value": "INTENT_PROMOCAO_TRES"
			}]
		}, {
			"title": "Mais 50 pontos",
			"subtitle": "Você paga R$ 783 em 3x no boleto e pode Vender por até R$ 990!",
			"images": [
				{ "url": "https://dummyimage.com/600x300" }
			],
			"buttons": [{
				"type": "postBack",
				"title": "Ver promoções",
				"value": "INTENT_PROMOCAO_TRES"
			}]
		}]);
		s.endDialog();
	},

	promocao_dois(s) {
		s.send('Ótima escolha! Quer ainda aumentar suas vendas e passar um pedido de 80 pontos ou mais? Posso te ajudar a montar um pedido especial para você e te mostrar promoções, lançamentos e presentes. Escolha uma opção.');

		helper.sendSlider(s, [{
			"title": "Mais 41 pontos",
			"subtitle": "Você paga R$ 663 em 3x no boleto e pode Vender por até R$ 893!",
			"images": [
				{ "url": "https://dummyimage.com/600x300" }
			],
			"buttons": [{
				"type": "postBack",
				"title": "Ver promoções",
				"value": "INTENT_PROMOCAO_QUATRO"
			}]
		}, {
			"title": "Mais 50 pontos",
			"subtitle": "Você paga R$ 783 em 3x no boleto e pode Vender por até R$ 990!",
			"images": [
				{ "url": "https://dummyimage.com/600x300" }
			],
			"buttons": [{
				"type": "postBack",
				"title": "Ver promoções",
				"value": "INTENT_PROMOCAO_QUATRO"
			}]
		}]);
		s.endDialog();
	},

	promocao_tres: (s) => {
		s.send('Ótima escolha! Agora você pode vender por até R$ 893.');
		s.endDialog();
	}

}