'use strict';
const express = require('express');
const checkConflictsEndpointRouter = require('./endpoints/check_conflicts-endpoint');

const app = express();
var port = process.env.PORT || 1337;

app.use(express.json());
app.use('/check_conflicts', checkConflictsEndpointRouter);

app.listen(port, () => {
    console.log('Running on PORT ' + port);
});