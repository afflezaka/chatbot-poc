const chatbot=require('../chatbot/chatbot')
const chatbot2=require('../chatbot/chatbot2')

module.exports = app => {

    app.get('/', (req, res) => {
        res.send({'hello': 'there'})
    });

    app.post('/api/df_text_query',async (req, res) => {


        let responses = await chatbot.textQuery(req.body.text, req.body.userID, req.body.parameters);
        let responses2 = await chatbot2.textQuery(req.body.text, req.body.userID, req.body.parameters)
        
        let confidence1=responses[0].queryResult.intentDetectionConfidence
        let confidence2=responses2[0].queryResult.intentDetectionConfidence

        let checkBestConfidence=(confidence1,confidence2)=>{
            if (confidence1>confidence2){return res.send(responses[0].queryResult)}

            if (confidence2>confidence1){return res.send(responses2[0].queryResult)}

             else{return res.send(responses[0].queryResult)}   
        }
       
        checkBestConfidence()
        
        // res.send({'hello':responses[0].queryResult.intentDetectionConfidence});
       
        console.log(responses[0].queryResult.intentDetectionConfidence)
        console.log(responses2[0].queryResult.intentDetectionConfidence)



    })



    app.post('/api/df_event_query', (req, res) => {
        res.send({'do': 'event query'})
    });
}