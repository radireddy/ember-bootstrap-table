/*jshint node:true*/
module.exports = function(app) {
    var express = require('express');
    var tableRouter = express.Router();
    var users = [{
        "id": "1",
        "firstName": "abc1",
        "lastName": "abc1",
        "age": 30
    }, {
        "id": "2",
        "firstName": "abc2",
        "lastName": "abc2",
        "age": 35
    }, {
        "id": "3",
        "firstName": "abc3",
        "lastName": "abc3",
        "age": 32
    }, {
        "id": "4",
        "firstName": "abc4",
        "lastName": "abc5",
        "age": 30
    }, {
        "id": "5",
        "firstName": "abc5",
        "lastName": "abc5",
        "age": 39
    }, {
        "id": "6",
        "firstName": "abc6",
        "lastName": "abc6",
        "age": 16
    }, {
        "id": "7",
        "firstName": "abc7",
        "lastName": "abc7",
        "age": 25
    }, {
        "id": "8",
        "firstName": "abc8",
        "lastName": "abc8",
        "age": 3
    }, {
        "id": "9",
        "firstName": "abc9",
        "lastName": "abc9",
        "age": 76
    }, {
        "id": "10",
        "firstName": "abc10",
        "lastName": "abc10",
        "age": 4
    }, {
        "id": "11",
        "firstName": "abc11",
        "lastName": "abc11",
        "age": 12
    }, {
        "id": "12",
        "firstName": "abc12",
        "lastName": "abc12",
        "age": 67
    }];

    tableRouter.get('/', function(req, res) {
        res.set('Content-Type', 'application/json');

        setTimeout(function() {
            res.send({
                'users': users
            });
        }, 2000);

    });

    tableRouter.post('/', function(req, res) {
        res.status(201).end();
    });

    tableRouter.get('/:id', function(req, res) {
        res.send({
            'table': {
                id: req.params.id
            }
        });
    });

    tableRouter.put('/:id', function(req, res) {
        res.send({
            'table': {
                id: req.params.id
            }
        });
    });

    tableRouter.delete('/:id', function(req, res) {
        res.status(204).end();
    });

    // The POST and PUT call will not contain a request body
    // because the body-parser is not included by default.
    // To use req.body, run:

    //    npm install --save-dev body-parser

    // After installing, you need to `use` the body-parser for
    // this mock uncommenting the following line:
    //
    //app.use('/api/table', require('body-parser').json());
    app.use('/api/table', tableRouter);
};
