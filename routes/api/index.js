var express = require('express');
var router = express.Router();

router.get('/health', function(req, res, next) {
  res.send({ health: 'ok' });
});

module.exports = router;
