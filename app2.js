
var express= require('express');
var bodyParser = require('body-parser');
var assert=require('assert');
var mongodb = require('mongodb');

var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017/ap2');

var app= express();
var querystring = require('querystring');
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets',express.static('assets'));

app.get ('/index',function(req,res){
  res.sendFile(__dirname + '/index.html');
});


app.post('/post-feedback', function (req, res) {
    dbConn.then(function(db) {
        delete req.body._id; // for safety reasons
        db.collection('feedbacks').insertOne(req.body);
    });
    res.send('Data received:\n' + JSON.stringify(req.body));
});

app.get('/view-feedbacks',  function(req, res) {
    dbConn.then(function(db) {
        db.collection('feedbacks').find({}).toArray().then(function(feedbacks) {
            res.status(200).json(feedbacks);
        });
    });
});


app.get('/get-data', function(req, res, next) {
  var resultArray = [];
  mongodb.connect(dbConn, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('feedbacks').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('index', {items: resultArray});
    });
  });
});

//app.listen(3000);
app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0' );
