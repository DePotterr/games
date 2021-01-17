var express = require('express');
const axios = require('axios').default;
var router = express.Router();

const DB_URL = "http://127.0.0.1:5984/games/";
const DB_VIEWS = "_design/views/_view/";

let games = []

/* GET ALL GAMES */
router.get('/', (req, res) => {
    axios.get(DB_URL + DB_VIEWS + 'allGames')
    .then(function (response) {
      //console.log(response.data.rows);
      res.json(response.data.rows)
      games = response.data.rows
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });
})

/* SEARCH ALL GAMES */
router.post('/searchAll', (req, res) => {
    let query = {
        "selector": {
            "name": {"$regex": "(?i)^" + req.body.name}
        },
        "fields": ["_id", "_rev", "name", "description", "price", "brand", "type"],
        "sort": [{"name": "asc"}],
        "execution_stats": true
    }
    axios.post(DB_URL + "_find", query)
    .then( response => {
        res.json(response.data.docs)
    })
    .catch( err =>{
        console.log(err)
    })
})

/* Search game on array */

// Hier kan men zelf een search algoritme inplementeren
router.post('/searchOnArray', (req, res) => {
    let regex = new RegExp('^' + req.body.name, "i")
    let foundGames = []
    for (let index = 0; index < games.length; index++) {
        if(regex.test(games[index].value.name)){
            foundGames.push(games[index])
        }
    }
    res.json(foundGames)
})

/* SEARCH ONE GAME */

router.post('/searchOne', (req, res) => {
    axios.get(DB_URL + DB_VIEWS + 'allGames' + '?key="' + req.body.name + '"')
    .then( response => {
        if(response.data.rows[0]){
            res.json(response.data.rows[0].value)
        }else{
            res.json( {"found":false} )
        }
    })
    .catch( err =>{
        console.log(err)
    })
})

/* VOORBEELD
    {"name":"PC"}
*/

/* DELETE A GAME */

router.post('/delete', (req, res) => {
    //console.log(DB_URL + DB_VIEWS + 'allProducts' + '?key="' + req.body.name + '"');
    axios.get(DB_URL + DB_VIEWS + 'allGames' + '?key="' + req.body.name + '"')
    .then( response => {
        if(response.data.rows[0]){
            axios.delete(DB_URL + response.data.rows[0].value._id + '?rev=' + response.data.rows[0].value._rev)
            .then(response => res.json(response.data))
            .catch(error => console.log(error))
        }else{
            res.json( {"found":false} )
        }
    })
    .catch( err =>{
        console.log(err)
    })
})

/* EDIT A GAME */

router.post('/edit', (req, res) => {
    req.body.type = "game"
    axios.put(DB_URL + req.body._id, req.body) // _id en _rev meegeven
    .then(response => res.json(response.data))
    .catch(error => console.log(error));
})

/*{
    "_id" : "8640caf04ef5deb23315ad18b10102c5",
    "_rev": "1-d82bb148685335ef2304271616335df2",
    "name": "TEST",
    "description": "TEST",
    "price": "TEST",
    "brand": "TEST",
    "type":"game"
  }
*/

/* ADD A GAME */

router.post('/add', (req, res) => {
    req.body.type = "game";
    axios.post(DB_URL, req.body)
      .then(response => res.json(response.data))
      .catch(error => console.log(error));
})


module.exports = router;
