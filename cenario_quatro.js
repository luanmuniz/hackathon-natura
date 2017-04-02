const builder = require('botbuilder');
const helper = require('./helper');
const got = require('got');

module.exports = {

	init(s) {
		s.send('Oi Maria, em que posso ajuda-la?');
	},

	async promocao(s) {
		s.send('Maria, analisamos o seu perfil e identificamos que essas promoções se encaixam com você. Essas promoções podem aumentar as suas vendas!');

		s.sendTyping();
		let apiResult = await got('http://40.71.226.49/rec/sortOffers?store=natura&field=price&q=%7B%22metadata%22%3A%7B%22natura%22%3A%22Promo%C3%A7%C3%A3o%22%7D%7D', {
			headers: { 'Authorization': 'adcfdecda123491231afddaee' }
		});

		let arrayToSend = [];

		JSON.parse(apiResult.body).forEach((thisPresente) => {
			let precoPromocao = (thisPresente.price * 0.7).toFixed(2);
			let prontos = Math.ceil(thisPresente.price / 4.2).toFixed(0);
			subtitle = `De: R$ ${thisPresente.list_price.toFixed(2)} Por: R$ ${precoPromocao}`;

			arrayToSend.push({
	            title: `${thisPresente.name} (${prontos} pontos)`,
	            subtitle: subtitle,
	            images: [ { url: thisPresente.img } ],
	            buttons: [{
	                type: "postBack",
	                title: "Adicionar ao pedido",
	                value: "INTENT_PROMOCAO_ADD"
	            }]
	        });
		});

		helper.sendSlider(s, arrayToSend);
		s.endDialog();
	},

	promocao_add(s) {
		s.send('Já adicionei a promoção ao seu pedido. Posso ajudar em mais alguma coisa?');
		s.endDialog();
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