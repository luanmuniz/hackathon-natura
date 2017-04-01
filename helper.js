const builder = require('botbuilder');

module.exports = {

	sendSlider(session, obj) {
		let finalArray = [];

		obj.forEach((thisItem) => {
			finalArray.push({
				"contentType": "application/vnd.microsoft.card.hero",
	            "content": thisItem
			});
		});

		var reply = new builder.Message(session)
	        .attachmentLayout(builder.AttachmentLayout.carousel)
	        .attachments(finalArray);

    	session.send(reply);
	}

}