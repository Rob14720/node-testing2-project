const express = require('express'); 
const server = express();
const dogsRouter = require('./api/dogs-router.js');

server.use(express.json());
server.use('/dogs', dogsRouter);

module.exports = server;