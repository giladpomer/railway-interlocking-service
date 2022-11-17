const express = require('express');
const check_conflicts = require('../modules/check_conflicts');

const router = express.Router();

router.post('/', (req, res) => {
    res.json(check_conflicts(req.body));
});

module.exports = router;