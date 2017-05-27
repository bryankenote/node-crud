var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var db = req.db;
    var collection = db.get('quoteCollection');
    collection.find({},{}, function(err,docs) {
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
router.post('/quotes', function (req, res) {
    var db = req.db;
    var name = req.body.name;
    var quote = req.body.quote;
    
    var collection = db.get('quoteCollection');
    collection.insert({
        "name": name,
        "quote": quote
    }, function (err, doc) {
        if (err) {
            res.send("There was a problem adding the quote to the database.");
        } else {
            res.send(doc);
            res.redirect('/');
        }
    });
});

// update
router.put('/quotes', function (req, res) {
    var db = req.db;
    var id = req.body.id;
    var name = req.body.name;
    var quote = req.body.quote;
    
    db.collection('quoteCollection').findOneAndUpdate(
        { '_id': id },
        { $set: { name: name, quote: quote } },
        //{ sort: { _id: -1 }, upsert: true },
        function (err, result) {
            if (err)
                res.send('Could not update the quote');
            else
                res.send(result);
        }
    );
});

//delete 
router.delete('/quotes', function (req, res) {
    var db = req.db;
    var id = req.body.id;
    
    db.collection('quoteCollection').findOneAndDelete(
        { '_id': id },
        function (err, result) {
            if (err)
                res.send('Could not update the quote');
            else
                res.send(result);
        }
    );
});

module.exports = router;
