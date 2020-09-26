const http = require('http');
const helmet = require("helmet");
const morgan = require('morgan');
const express = require("express");
const backendCaller = require("./service/backendCaller");

const HTTP_PORT=9090
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

async function getBackendResponse() {
    return await backendCaller.serveBackend();
}

app.get('/ready', (req,res) =>{
    res.send('Ready!');
})

app.get('/', (req, res)=> {
    getBackendResponse().then( (result) => {
        res.send('Hello from Frontend & '.concat(result));
    });
})

const httpServer =http.createServer(app);
httpServer.listen(HTTP_PORT);