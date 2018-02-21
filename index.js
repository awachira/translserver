const express = require('express');
const http = require('http');
const morgan = require('morgan');

const GoogleCloudTranslateRouter = require('./routes/gctranslate');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));
app.use('/translate', GoogleCloudTranslateRouter);

app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body>You are in the wrong place yo!</body></html>');
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server live at http://${hostname}:${port}`);
});
