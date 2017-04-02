const builder = require('botbuilder');
const helper = require('./helper');

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
	},

	promocao(s) {
		s.send('Legal! Você escolheu promoções! Aqui estão duas indicações que escolhemos especialmente para te ajudar a você passar o pedido de 50 pontos ou mais!');

		helper.sendSlider(s, [{
			"title": "Mais 12 pontos",
			"subtitle": "Você paga R$ 450 em 2x no boleto e pode Vender por até R$ 585!",
			"images": [
				{ "url": "https://dummyimage.com/600x300" }
			],
			"buttons": [{
				"type": "postBack",
				"title": "Ver promoções",
				"value": "22222222222222222222"
			}]
		}, {
			"title": "Mais 15 pontos",
			"subtitle": "Você paga R$ 450 em 2x no boleto e pode Vender por até R$ 585!",
			"images": [
				{ "url": "https://dummyimage.com/600x300" }
			],
			"buttons": [{
				"type": "postBack",
				"title": "Ver promoções",
				"value": "22222222222222222222"
			}]
		}]);
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
				"value": "33333333333333333333"
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
				"value": "33333333333333333333"
			}]
		}]);
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
				"value": "44444444444444444444"
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
				"value": "44444444444444444444"
			}]
		}]);
	},

	promocao_tres: (s) => {
		s.send('Ótima escolha! Agora você pode vender por até R$ 893.');
	}

}