var express = require('express')
var mongo = require('mongodb')
var dotenv = require('dotenv')
var bodyparser = require('body-parser')
var cors = require('cors')
dotenv.config()

var app = express()
var port = process.env.PORT || 1234
// var mongoport = process.env.mongourl
var mongoport = 'mongodb+srv://Robin:amanrobin@cluster0.q4zxq.mongodb.net/form?retryWrites=true&w=majority'
var mongoclient = mongo.MongoClient
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(cors())
var db;

app.get('/',(req,res) => {
    res.send('Default Route')
})

app.get('/data', (req, res) => {
    db.collection('formdata').find().toArray((err, result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.post('/post', (req,res) => {
    db.collection('formdata').insertOne(req.body,(err, result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.get('/mcq', (req, res) => {
    db.collection('questions').find().toArray( (err, result) => {
        if(err) throw err;
        res.send(result)
    })
})

mongoclient.connect(mongoport, (err, client) => {
    if(err) console.log('Error in mongoclient');
    db = client.db('form');
    app.listen(port,() => {
        console.log(`Port ${port}`)
    })
})