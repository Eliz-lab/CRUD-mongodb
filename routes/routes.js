const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const assert = require ('assert'); 
const url = 'mongodb://localhost:27017'; //check at mongo the port number
const dbName = 'test5'; // show dbs

//GET
router.get('/',function(req,res){
    res.render('home', {title:'CRUD Exercises!'})
})

router.get('/get-data', (req, res)=>{
    const resultArray =[];
    MongoClient.connect(url,{ useUnifiedTopology: true },(err, client)=>{
        const db = client.db(dbName);
        const collection = db.collection('users2'); //check the name of the collection on Mongo
        const info = collection.find();
        info.forEach(function(doc){
            resultArray.push(doc);
        }, function (){
            res.render('home', {title: "CRUD Exercises: Create, Read, Update and Delete!",items: resultArray})
        })
    })
})
router.post('/insert', (req, res)=>{
    const item ={
        title:req.body.title,
        content: req.body.content,
        author: req.body.author
    }
    MongoClient.connect(url, (err, client)=>{
        assert.strictEqual(null,err);
        const db = client.db(dbName);
        const collection = db.collection('users2');
        collection.insertOne(item);
    })

    res.redirect('/');
})

//Update
router.post('/update-data', (req, res)=>{
    //const newData = db.get('')
    const item ={
        id:req.body.id,
        title:req.body.title,
        content: req.body.content,
        author: req.body.author
    }
    MongoClient.connect(url, (err, client)=>{
        console.log(err)
        assert.strictEqual(null,err);
        const db = client.db(dbName);
        const collection = db.collection('users2');
        collection.findOneAndUpdate({_id: objectId(item.id)},{$set:item},{new: false});//need to code the unupdated fields to avoid the return of empty string
    res.redirect('/');

    })
})

//Delete
router.delete('/delete-data/:id', (req, res)=>{
    const id ={
        _id: objectId(req.body.id)
    }
    MongoClient.connect(url, (err, client)=>{
        assert.strictEqual(null,err);
        const db = client.db(dbName);
        const collection = db.collection('users2');
        const item = collection.findOne(id)
        collection.deleteOne(item);
        res.json({ success: id })
        //res.redirect('/')
    });
})

module.exports = router;

//notes:
// delete /request

//mongodb difference remove() vs findOneAndDelete() vs deleteOne()

//to read POST Data in Server side use (req.body) 
//to read GET Data in Server side use (req.params) 