const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('client/build'));

app.get('/', (req, res) => {
  res.sendFile(path.join(`${ __dirname }/client/build/index.html`));
});

app.get('/info', (req, res) => {
  res.sendFile(path.join(`${ __dirname }/client/build/info.html`));
})

app.get('/rules', (req, res) => {
  res.sendFile(path.join(`${ __dirname }/client/build/rules.html`));
});

app.get('/new', (req, res) => {
  res.sendFile(path.join(`${ __dirname }/client/build/index.html`));
});

const server = app.listen(3000, function () {
  console.log(`Bang! The JS Game listening on port ${ this.address().port }`);
});
