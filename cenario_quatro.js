const builder = require('botbuilder');
const helper = require('./helper');
const got = require('got');

module.exports = {

	init(s) {
		s.send('Oi Hivio, em que posso ajudá-lo?');
		s.endDialog();
	},

	async selecionarCategoria(s) {
		actualIntent = s.dialogData['BotBuilder.Data.Intent'];

		if (actualIntent === 'PROMOCAO') {
			s.send(`Tudo bem, entendi que você quer falar sobre promoções. Agora, me fala sobre qual tipo de produto você quer.`)
			s.endDialog();
		}

		if (actualIntent === 'LANCAMENTO') {
			s.send(`Tudo bem, entendi que você quer falar sobre lançamentos. Agora, me fala sobre qual tipo de produto você quer.`)
			s.endDialog();
		}
	},

	async produto(s) {
		let texto = '';
		let objToQuery = {
			metadata: {}
		};

		if(!actualIntent) {
			actualIntent = 'PRESENTE';
		}

		let intentSubstative = '';
		switch (s.dialogData['BotBuilder.Data.Intent']) {
			case 'PERFUME':
				objToQuery.metadata.substantive = 'Perfume Natura';
				objToQuery.metadata.type = { or: ["Deo Colônia", "Deo Parfum"]};
				break;
			case 'HIDRATANTE':
				objToQuery.metadata.substantive = 'Hidratante Natura';
				break;
			case 'SHAMPOO':
				objToQuery.metadata.substantive = 'Shampoo Natura';
				break;
		}

		if (actualIntent === 'PROMOCAO') {
			objToQuery.metadata.natura = 'Promoção';
			texto = 'Hivio, analisamos seus pedidos anteriores e identificamos esses produtos podem aumentar as suas vendas!';
		}

		if (actualIntent === 'LANCAMENTO') {
			objToQuery.metadata.natura = 'Lançamento';
			texto = 'Os lançamentos do ciclo atual são esses abaixo';
		}

		if (actualIntent === 'PRESENTE') {
			objToQuery.metadata.substantive = 'Presente Natura';
			texto = 'Muito bem, abaixo estão alguns presentes que combinam com seus últimos pedidos e que provavelmente irão agregar ao seu cliente.';
		}

		let stringToQuery = encodeURI(JSON.stringify(objToQuery)).replace(/\:/mg, '%3A').replace(/\,/mg, '%2C');

		s.send(texto);
		s.sendTyping();
		let apiResult = await got(`http://40.71.226.49/rec/sortOffers?store=natura&field=price&q=${stringToQuery}`, {
			headers: {
				'Authorization': 'adcfdecda123491231afddaee'
			}
		});

		let arrayToSend = [];
		JSON.parse(apiResult.body).forEach((thisPresente) => {
			let precoPromocao = (thisPresente.price * 0.7).toFixed(2);
			let prontos = Math.ceil(thisPresente.price / 4.2).toFixed(0);
			subtitle = `De: R$ ${thisPresente.list_price.toFixed(2)} Por: R$ ${precoPromocao}`;

			if (actualIntent === 'PRESENTE') {
				subtitle = '';
			}

			arrayToSend.push({
				title: `${thisPresente.name} (${prontos} pontos)`,
				subtitle: subtitle,
				images: [{
					url: thisPresente.img
				}],
				buttons: [{
					type: "postBack",
					title: `Adicionar #${thisPresente.id} ao pedido`,
					value: "INTENT_CATEGORIA_ADD"
				}]
			});
		});

		helper.sendSlider(s, arrayToSend);
		s.endDialog();
	},

	categoria_add(s) {
		s.send(`Já adicionei o produto ao seu pedido. Posso ajudar em mais alguma coisa?`);
		s.endDialog();
	},

	async vendido(s) {
		s.send(`Esses são os produtos mais vendidos que mais combinam com você!`);
		let objToQuery = {
			metadata: {
				substantive: 'Perfume Natura',
				type : { or: ["Deo Colônia", "Deo Parfum"]}
			}
		};

		actualIntent = 'oferta';

		s.sendTyping();
		let stringToQuery = encodeURI(JSON.stringify(objToQuery)).replace(/\:/mg, '%3A').replace(/\,/mg, '%2C');
		let apiResult = await got(`http://40.71.226.49/rec/sortOffers?store=natura&field=price&q=${stringToQuery}`, {
			headers: {
				'Authorization': 'adcfdecda123491231afddaee'
			}
		});

		let arrayToSend = [];
		JSON.parse(apiResult.body).forEach((thisPresente) => {
			let precoPromocao = (thisPresente.price * 0.7).toFixed(2);
			let prontos = Math.ceil(thisPresente.price / 4.2).toFixed(0);
			subtitle = `De: R$ ${thisPresente.list_price.toFixed(2)} Por: R$ ${precoPromocao}`;

			arrayToSend.push({
				title: `${thisPresente.name} (${prontos} pontos)`,
				subtitle: subtitle,
				images: [{
					url: thisPresente.img
				}],
				buttons: [{
					type: "postBack",
					title: `Adicionar #${thisPresente.id} ao pedido`,
					value: "INTENT_CATEGORIA_ADD"
				}]
			});
		});

		helper.sendSlider(s, arrayToSend);
		s.endDialog();
	},

	obrigado(s) {
		s.send('Ótimo!! Sempre que quiser, estarei aqui para te ajudar! Boas vendas!');
		actualIntent = '';
		s.endDialog();
	}

}