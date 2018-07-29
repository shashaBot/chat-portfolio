require('dotenv').config()

const Dialogflow = require('dialogflow').v2beta1

let generateNewId = () => {
	return 'temp'
}

module.exports = class {
	constructor(projectId, sessionId=generateNewId(), langCode='en') {
		this.sessionClient = new Dialogflow.SessionsClient()
		this.sessionPath = this.sessionClient.sessionPath(projectId, sessionId)
		this.langCode = langCode
	}

	detectTextIntent(text) {
		let request = {
			session: this.sessionPath,
			queryInput: {
				text: {
					text,
					languageCode: this.langCode
				}
			}
		}
		return this.sessionClient.detectIntent(request)
	}

	detectEventIntent(eventName, data) {
		let request = {
			session: this.sessionPath,
			queryInput: {
				event: {
					name: eventName,
					languageCode: this.langCode,
					data
				}
			}
		}

		return this.sessionClient.detectIntent(request)

	}

}
