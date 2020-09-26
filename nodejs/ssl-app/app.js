const fs = require('fs');
const https = require('https');
const helmet = require("helmet");
const morgan = require('morgan');
const express = require("express");

const key = fs.readFileSync('certs/tls.key', 'utf8');
const cert = fs.readFileSync('certs/tls.crt', 'utf8');
const certs = {key: key, cert: cert};

const HTTPS_PORT=15022
const app = express();
app.use(helmet());

morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
})

app.get('/', (req,res) =>{
    console.log(`request served by HTTPS: ${HTTPS_PORT}`)
    res.send('UP');
})

const httpServer =https.createServer(certs, app);
httpServer.listen(HTTPS_PORT);
console.log(`HTTPS server running on port: ${HTTPS_PORT}`)