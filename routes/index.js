var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('quoteCollection');
    collection.find({},{},function(err,docs){
        if (err) {
            res.send("There was a problem retrieving quotes from the database.");
        } else {
            res.render('index', {
                "quotes" : docs
            });
        }
    });
});

// create
router.post('/quotes', (req, res) => {
    var db = req.db;
    var name = req.body.name;
    var quote = req.body.quote;
    
    var collection = db.get('quoteCollection');
    collection.insert({
        "name": name,
        "quote": quote
    }, (err, doc) => {
        if (err) {
            res.send("There was a problem adding the quote to the database.");
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
