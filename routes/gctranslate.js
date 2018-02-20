const express = require('express');
const bodyParser = require('body-parser');

// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');
const translate = new Translate();

const gctransRouter = express.Router();
gctransRouter.use(bodyParser.json());

gctransRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    next();
})
.post((req, res, next) => {
    let message = req.body.message;
    let language = req.body.lang;
    let translation = '';
    translate
        .translate(message, language)
        .then(results => {
            translation = results[0];
            const msg = Object.assign({}, req.body, { translation: translation });
            res.end(JSON.stringify(msg));
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
})
.get((req, res, next) => {
    res.end(JSON.stringify(req.body));    
})
.put((req, res, next) => {
    res.statusCode = 403;
    let msg = { 'error': 'PUT not supported!' };
    res.end(JSON.stringify(msg));
})
.delete((req, res, next) => {
    res.statusCode = 403;
    let msg = { 'error': 'DELETE not supported!' };
    res.end(JSON.stringify(msg));
});

module.exports = gctransRouter;
