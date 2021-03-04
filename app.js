//npm install express-handlebars --save
//lsof -I tcp:3000 - 
//app.js - server
const express = require('express');
const path = require('path');
//handlebars
const hbs =require('express-handlebars');
const router = require('./routes/routes')

//server configuration
const app = express();
const port =3000;

app.engine('hbs',hbs({extname:'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.urlencoded({extended: true}));//it should be before the the app.use root
app.use('/', router);

//middlewares for public folder and url
app.use(express.static(__dirname + '/public/stylesheets/'));


app.listen(port, ()=> console.log('Listening on port : ' + port));





//-------------------------------------------------------------
//GET
/* app.get('/get' , (req, res)=>{
    res.send("/GET page!!!")
    //connect database, find collection, get data from db
    const resultArray = [];
    MonogoClient.connect(url,(err, client) =>{ //2 parameters: url and a callback
        const db = client.db(dbName);
        const collection = db.collection('users');
        const info = collection.find();

        info.forEach(function(doc,err){
            resultArray.push(doc);
        }, function(){
            res.send(JSON,stringify(resultArray))
        })
    })

}) */

/* //POST
app.post('/',(req,res)=>{
 //object to pass my insert method to insert input in users collection
 const name = {
     fname: req.body.fname,
     lname: req.body.lname
    }
    //callback for error and client
    MongoClient.connect(url, (err, client)=>{
        assert.strictEqual(null, err); //if not null throw error
        const db = client.db(dbName);
        const collection = db.collection('users');
        collection.insertOne(name);
    })    
    res.redirect('/get')
})
 */