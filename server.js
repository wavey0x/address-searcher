const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries');
const https = require("https");
const fs = require("fs");
const app = express()

const port = 3001

app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/addresses', db.getAddresses)

https.createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
    app
    ).listen(port, () => {
    console.log(`App running on port ${port}.`)
})

