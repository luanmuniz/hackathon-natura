const builder = require('botbuilder');
const helper = require('./helper');

module.exports = {

	promocao: (s) => {
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
				"value": "/promocao_um"
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
				"value": "/promocao_um"
			}]
		}]);
	},

	promocao_um: (s) => {
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
				"value": "/promocao_dois"
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
				"value": "/promocao_dois"
			}]
		}]);
	},

	promocao_dois: (s) => {
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
				"value": "/promocao_tres"
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
				"value": "/promocao_tres"
			}]
		}]);
	},

	promocao_tres: (s) => {
		s.send('Ótima escolha! Agora você pode vender por até R$ 893.');
	}

}