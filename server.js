var express = require('express');
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var url = 'mongodb://localhost:27017/databaseName';

app.use(bodyParser.json())

app.get( '/', function(req, res){
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.get ('/info', function(req, res){
  res.sendFile(path.join(__dirname + '/client/build/info.html'));
})

app.get( '/rules', function(req, res){
  res.sendFile(path.join(__dirname + '/client/build/rules.html'));
});

app.get( '/new', function(req, res){
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.get('/name', function(req, res){
  MongoClient.connect(url, function(err, db){
    if(err){
      console.log(err);
      return;
    }
    var collection = db.collection('name');
    collection.find({}).toArray(function(err, docs){
      res.json(docs);
      db.close();
    });
  });
});

app.post('/name', function(req, res){
  MongoClient.connect(url, function(err, db){
    if(err){
      console.log(err);
      return;
    }
    var collection = db.collection('name');
    collection.insert({'name': 'value'});
  });
  res.status(200).end();
  db.close();
});

app.use(express.static('client/build'));
var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server running at https://%s:%s', host, port);
});