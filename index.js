const express = require('express');
const http = require('http');
const morgan = require('morgan');

const GoogleCloudTranslateRouter = require('./routes/gctranslate');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));
app.use('/translate', GoogleCloudTranslateRouter);

const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server live at http://${hostname}:${port}`);
});
