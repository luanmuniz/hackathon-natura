const builder = require('botbuilder');
const helper = require('./helper');

module.exports = {

	init(s) {
		s.send('Oi Maria, em que posso ajuda-la?');
	},

	promocao(s) {
		s.send('Maria, analisamos o seu perfil e identificamos que essas promoções se encaixam com você. Essas promoções podem aumentar as suas vendas!');

		helper.sendSlider(s, [{
			"title": "PROMOCAO 1",
			"subtitle": "Você paga R$ 450 em 2x no boleto e pode Vender por até R$ 585!",
			"images": [
				{ "url": "https://dummyimage.com/600x300" }
			],
			"buttons": [{
				"type": "openUrl",
				"title": "Veja mais sobre essa promoção",
				"value": "http://natura.com.br"
			}]
		}, {
			"title": "PROMOCAO 2",
			"subtitle": "Você paga R$ 450 em 2x no boleto e pode Vender por até R$ 585!",
			"images": [
				{ "url": "https://dummyimage.com/600x300" }
			],
			"buttons": [{
				"type": "openUrl",
				"title": "Veja mais sobre essa promoção",
				"value": "http://natura.com.br"
			}]
		}]);
	},

	lancamento(s) {
		s.send('Os lançamentos do ciclo atual sao esses abaixos');

		helper.sendSlider(s, [{
			"title": "LANCAMENTO 1",
			"subtitle": "Você paga R$ 450 em 2x no boleto e pode Vender por até R$ 585!",
			"images": [
				{ "url": "https://dummyimage.com/600x300" }
			],
			"buttons": [{
				"type": "openUrl",
				"title": "Veja mais sobre essa promoção",
				"value": "http://natura.com.br"
			}]
		}, {
			"title": "LANCAMENTO 2",
			"subtitle": "Você paga R$ 450 em 2x no boleto e pode Vender por até R$ 585!",
			"images": [
				{ "url": "https://dummyimage.com/600x300" }
			],
			"buttons": [{
				"type": "openUrl",
				"title": "Veja mais sobre essa promoção",
				"value": "http://natura.com.br"
			}]
		}]);
	},

	presente(s) {
		s.send('Claro, abaixo alguns presentes que combinam com seu histórico de pedidos e que provavelmente irá agregar ao seu cliente.');

		helper.sendSlider(s, [{
			"title": "PRESENTE 1",
			"subtitle": "Você paga R$ 450 em 2x no boleto e pode Vender por até R$ 585!",
			"images": [
				{ "url": "https://dummyimage.com/600x300" }
			],
			"buttons": [{
				"type": "openUrl",
				"title": "Veja mais sobre essa promoção",
				"value": "http://natura.com.br"
			}]
		}, {
			"title": "PRESENTE 2",
			"subtitle": "Você paga R$ 450 em 2x no boleto e pode Vender por até R$ 585!",
			"images": [
				{ "url": "https://dummyimage.com/600x300" }
			],
			"buttons": [{
				"type": "openUrl",
				"title": "Veja mais sobre essa promoção",
				"value": "http://natura.com.br"
			}]
		}]);
	},

	modelo(s) {
		s.send('Sim. Você gostaria de um modelo de 50 pontos ou 80 pontos?');
	},

	modelo_cinco(s) {
		s.send('Segue os produtos que pensamos atende aos seus clientes para elaborar a lista.')

		helper.sendSlider(s, [{
			"title": "MODELO 1",
			"subtitle": "Você paga R$ 450 em 2x no boleto e pode Vender por até R$ 585!",
			"images": [
				{ "url": "https://dummyimage.com/600x300" }
			],
			"buttons": [{
				"type": "openUrl",
				"title": "Veja mais sobre essa promoção",
				"value": "http://natura.com.br"
			}]
		}, {
			"title": "MODELO 2",
			"subtitle": "Você paga R$ 450 em 2x no boleto e pode Vender por até R$ 585!",
			"images": [
				{ "url": "https://dummyimage.com/600x300" }
			],
			"buttons": [{
				"type": "openUrl",
				"title": "Veja mais sobre essa promoção",
				"value": "http://natura.com.br"
			}]
		}]);
	},

	obrigado(s) {
		s.send('Por nada')
	},

	pedido(s) {
		s.send('Ótimo!!! Sempre que quiser, estarei aqui para te ajudar! Boas Vendas');
		s.endDialog();
	}

}