'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();

const app = express();
const data = []

express.static.mime.define({'application/vnd.hbbtv.xhtml+xml;': ['html']})

app.use(bodyParser);
app.use('/', express.static('detector'));
app.use('/polyfills', express.static('polyfills'));

app.post('/report', (req, res) => {
    const userAgent =  req.headers['user-agent'];
    const device = req.body.device;
    const name = req.body.name;
    const result = req.body.result;
    data.push({userAgent, device, name, result})
    res.status(200).send();
});

app.get('/report', (req, res) => {
    res.status(200).send(data);
});

app.listen(8080);