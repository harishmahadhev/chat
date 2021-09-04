'use strict'
const { Registration } = require("../database/models/Registration")
const config = require('../config/keys')
const dialogflow = require('dialogflow')
const structjson = require('./structJson')
const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID
const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey,
}
const sessionClient = new dialogflow.SessionsClient({ projectId, credentials });

module.exports = {
    textQuery: async function (text, userId, parameters = {}) {
        let self = module.exports;
        const sessionPath = sessionClient.sessionPath(projectId, sessionId + userId)
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses)
        return responses;
    },

    eventQuery: async function (event, userId, parameters = {}) {
        console.log("ENtering into event query")
        const sessionPath = sessionClient.sessionPath(projectId, sessionId + userId)

        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    // The query to send to the dialogflow agent
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters),
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
        };

        let responses = await sessionClient.detectIntent(request); console.log("GEtting response from Detect indent")
        responses = self.handleAction(responses)
        return responses;
    },
    handleAction: (responses) => {

        let queryResult = responses[0].queryResult;
        console.log("Entering into handleAction")
        let self = module.exports;
        switch (queryResult.action) {
            case 'recommendcourses-yes':
                if (queryResult.allRequiredParamsPresent) {
                    self.saveRegistration(queryResult.parameters.fields)
                }
                break;
        }
        return queryResult;
    },
    saveRegistration: async (fields) => {
        const registration = new Registration({
            name: fields.name.stringValue,
            address: fields.address.stringValue,
            phone: fields.phone.stringValue,
            email: fields.email.stringValue,
            dateSent: Date.now()
        })
        try {
            let reg = await registration.save();
            console.log(reg);
        } catch (err) {
            console.log(err)
        }
    }
}