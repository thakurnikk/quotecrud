const express = require('express')
const bodyParser = require('body-parser')
var config = require("./config")
const MongoClient = require('mongodb').MongoClient

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')

var db

MongoClient.connect(config.con, (err, client) => {
if (err) {
    return console.log(err)
}
else{
    db = client.db('quotes') // whatever your database name is

    app.listen(3000, () => {
        console.log('listening on 3000')
    })
}
  
})

app.get('/', (req, res) => {
    console.log("inside get")
    db.collection('quotesCollection').find().toArray((err, result) => {
      if (err) return console.log(err)
      console.log(result)
      // renders index.ejs
      res.render('index.ejs', {quotes: result})
    })
  })
  

app.post('/quotes', (req, res) => {
    if (req.body.name==req.body.quote || req.body.name.length<4 || req.body.name.length<4)
    {
        res.status(400).send({"status":"400", "error":'Enter Appropriate Name or Quote'});
    }  
    else{
        db.collection('quotesCollection').insertOne(req.body, (err, result) => {
            if (err) return console.log(err)
        
            console.log('saved to database')
            res.redirect('/')
        })
    }
    
})
