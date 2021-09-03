const { Router } = require('express');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Demand, Coupon } = require('../database/models/Registration');
const fulfillmentRouter = Router()

fulfillmentRouter.route("/")
    .get((req, res) => {
        res.write("Hi")
    })
    .post(async (req, res) => {
        const agent = new WebhookClient({ request: req, response: res })
        function jiju(agent) {
            agent.add("Welcome to my snoopy fulfillment")
        }
        const learn = async () => {
            let course = agent.parameters.course[0]
            Demand.findOne({ course: course }, (err, docs) => {
                if (docs !== null) {
                    docs.counter++;
                    docs.save();
                } else {
                    const demand = new Demand({ course: course });
                    demand.save();
                }
            });
            let responseText = `You want to learn about ${course}`

            let coupon = await Coupon.findOne({ course: course });
            if (coupon !== null) {
                responseText = `You want to learn about ${course}, Here is a link to the course : ${coupon.link}`
            }
            agent.add(responseText);

        }
        function fallback(agent) {
            agent.add("I didnt understand")
            agent.add("I'm sorry, can you try again?")
        }
        let intentMap = new Map();
        intentMap.set("Jiju", jiju);
        intentMap.set("learn courses", learn)
        intentMap.set("Default Fallback Intent", fallback)

        agent.handleRequest(intentMap);
    })

module.exports = fulfillmentRouter;