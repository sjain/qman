var express = require('express');
var users = require('../app/controllers/users');
var router = express.Router();

router.get('/', users.list);
router.get('/new', users.new);
router.post('/', users.create);
router.get('/:id', users.edit);
router.post('/:id', users.update);

module.exports = router;
