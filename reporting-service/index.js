'use strict';

const express = require('express');
const fs = require('fs');
const util = require('util');
const bodyParser = require('body-parser').json();

const app = express();
const reportStream = fs.createWriteStream('report.csv');

express.static.mime.define({'application/vnd.hbbtv.xhtml+xml;': ['html']})

app.use(bodyParser);
app.use('/', express.static('detector'));
app.use('/polyfills', express.static('polyfills'));

app.post('/report', (req, res) => {
    const userAgent =  req.headers['user-agent'];
    const name = req.body.name;
    const result = req.body.result;
    reportStream.write(`"${userAgent}";"${name}";"${result}"\n`);
    res.status(200).send();
});

app.listen(8080);