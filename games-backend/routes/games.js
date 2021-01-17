var express = require('express');
const axios = require('axios').default;
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var db;

var games = [];

MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, (err, database) => {
    if (err) return console.log(err)
    db = database.db('games')
})

/* GET ALL GAMES */
router.get('/', (req, res) => {
    db.collection('items').find().toArray((err, result) => {
        if (err) return
        games = result;
        res.json(games)
    })
})

/* SEARCH ALL GAMES */
router.post('/searchAll', (req, res) => {
    var query = { name: new RegExp('^' + req.body.name, "i") }
    db.collection('items').find(query).toArray((err, result) => {
        if (err) return
        res.json(result)
    })
})

/* SEARCH ONE GAME */

router.post('/searchOne', (req, res) => {
    var query = { name: req.body.name }
    db.collection('items').find(query).toArray((err, result) => {
        if (err) return
        res.json(result);
    })
})

/* Search game on array */

// Hier kan men zelf een search algoritme inplementeren
router.post('/searchOnArray', (req, res) => {
    var regex = new RegExp('^' + req.body.name, "i")
    var foundGames = []
    for (let index = 0; index < games.length; index++) {
        if(regex.test(games[index].name)){
            foundGames.push(games[index])
        }
    }
    res.json(foundGames)
})

/* DELETE A GAME */

router.delete('/delete/:name', (req, res) => {
     db.collection('items').findOneAndDelete({ name: req.params.name }, () => {
        res.json({"succes":true})
     })
})

/* EDIT A GAME */

router.post('/edit', (req, res) => {
    db.collection('items').replaceOne({ name: req.body.name }, req.body, () => {
        res.json({"succes":true})
    })
})

/* ADD A GAME */

router.post('/add', (req, res) => {
    db.collection('items').insertOne(req.body, () =>{
        res.json({"succes":true})
    })
})


module.exports = router;
