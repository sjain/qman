var express = require('express');
var users = require('../app/controllers/users');
var router = express.Router();

router.get('/', users.list);
router.put('/:id', users.update);

module.exports = router;
