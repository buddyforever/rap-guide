const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/api', function (req, res) {
  res.json({ username: 'jessejburton' })
});

app.listen(process.env.PORT || 8080);