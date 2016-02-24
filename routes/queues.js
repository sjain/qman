var express = require('express');
var queues = require('../app/controllers/queues');
var router = express.Router();

router.get('/', queues.list);
router.get('/new', queues.new);
router.post('/', queues.create);
router.get('/:id', queues.edit);
router.post('/:id', queues.update);

module.exports = router;
