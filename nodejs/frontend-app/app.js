const http = require('http');
const express = require("express");
const backendCaller = require("./service/backendCaller");

const HTTP_PORT=9090
const app = express();

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