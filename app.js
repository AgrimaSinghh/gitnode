var express= require('express');
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var assert = require('assert');
var querystring = require('querystring');

var app= express();
app.set('view engine','ejs');

var url ='mongodb://localhost:27017/nodeapp';
var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017/nodeapp');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/assets',express.static('assets'));

app.get('/',function(req,res){
  res.render('form',{qs: req.query});
});

app.get('/submit', urlencodedParser, function (req, res) {
console.log(req.body);
res.render('new book',{qs: req.query});
});



app.get ('/home',function(req,res){
  res.render('home',{qs: req.query});
});
// to handle post req and grab data from a form and do something with that data( i need to search for it in a database)

/*app.get('/get-data', function(req, res, next) {
  var resultArray = [];
  mongodb.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('newbook').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('data', {newbook: resultArray});
    });
  });
});*/

/*app.get('/homee', urlencodedParser, function(req, res) {
    dbConn.then(function(db){
      db.collection("newbook").findOne({}, function(err, result) {
      if (err) throw err;
      console.log(result.firstname);
      db.close();
    });
    });
  });*/

app.post('/thanks', urlencodedParser, function (req, res) {
console.log(req.body);
  res.render('thanks',{data: req.body});
 //dbConn.then(function(db) {
//delete req.body._id; // for safety reasons
//db.collection('newbook').find( { firstname: "priya" } )
  //    db.collection('newbook').insertOne(req.body);
  //  });
});


app.get ('/contact',function(req,res){
  res.render('contact');
});

/*app.get('/data', urlencodedParser, function (req, res) {
console.log(req.body);
res.render('success',{qs: req.query});
});*/

app.get ('/search/:type', function(req,res){
  res.render('search', {category:req.params.type});
});
app.listen(3000);
