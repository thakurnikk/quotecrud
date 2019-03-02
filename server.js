const express = require('express')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.listen(3000, function(){
    console.log("listening on port 3000")
})

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/quotes', (req, res) => {
    console.log(req.body)
    res.status(200).send(req.body)
})
