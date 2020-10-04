const express = require('express');
const router = express.Router();
const { controllerCallback } = require('../../app/middleware/express');

router.get('/health', function(req, res, next) {
  res.send({ health: 'ok' });
});

// users
const userController = require('../../app/controllers/users');
router.get('/users/:id', controllerCallback(userController.findById))
router.post('/users', controllerCallback(userController.create))

// orders
const orderController = require('../../app/controllers/orders');
router.get('/orders', controllerCallback(orderController.all))
router.post('/orders', controllerCallback(orderController.create))
router.get('/orders/:id', controllerCallback(orderController.findById))
router.post('/orders/:id', controllerCallback(orderController.update))
router.delete('/orders/:id', controllerCallback(orderController.delete))

module.exports = router;
