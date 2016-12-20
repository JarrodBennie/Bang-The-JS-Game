const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const url = 'mongodb://localhost:27017/databaseName';

app.use(bodyParser.json());
app.use(express.static('client/build'));

app.get( '/', (req, res) => {
  res.sendFile(path.join(`${ __dirname }/client/build/index.html`));
});

app.get ('/info', (req, res) => {
  res.sendFile(path.join(`${ __dirname }/client/build/info.html`));
})

app.get( '/rules', (req, res) => {
  res.sendFile(path.join(`${ __dirname }/client/build/rules.html`));
});

app.get( '/new', (req, res) => {
  res.sendFile(path.join(`${ __dirname }/client/build/index.html`));
});

app.get('/name', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) {
      console.err(err);
      return;
    }

    const collection = db.collection('name');
    collection.find({}).toArray((err, docs) => {
      res.json(docs);
      db.close();
    });
  });
});

app.post('/name', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) {
      console.err(err);
      return;
    }

    const collection = db.collection('name');
    collection.insert({'name': 'value'});
  });

  res.status(200).end();
  db.close();
});

const server = app.listen(3000, function () {
  console.log(`Bang! The JS Game listening on port ${ this.address().port } `);
});