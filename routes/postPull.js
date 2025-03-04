const initOptions = {
    connect(e) {
        const cp = e.client.connectionParameters;
        console.log('Connected to database', cp.database)
    }
};
const pgp = require('pg-promise')(initOptions);
const db = pgp('postgres://admin:admin@127.0.0.1:5432/pxchatdb')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {  
    db.one('SELECT * FROM chat as STRING')
        .then((data) => {
            res.render('postPull', { msg: data});
        })
        .catch((error) => {
            res.render('postPull', { msg: error});
        })
    });

  module.exports = router;