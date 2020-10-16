const express = require('express');
const router = express.Router();
const { controllerCallback } = require('../../app/middleware/express');

router.get('/health', function(req, res, next) {
  res.send({ health: 'ok' });
});

// users
const userController = require('../../app/controllers/users');
router.get('/users/:id', controllerCallback(userController.findById))
router.get('/users', controllerCallback(userController.all))
router.post('/users', controllerCallback(userController.create))

// orders
const orderController = require('../../app/controllers/orders');
router.get('/orders', controllerCallback(orderController.all))
router.post('/orders', controllerCallback(orderController.create))
router.get('/orders/:id', controllerCallback(orderController.findById))
router.post('/orders/:id', controllerCallback(orderController.update))
router.post('/orders/:id/retry_payment', controllerCallback(orderController.retry_payment))
router.get('/orders/:id/payment_logs', controllerCallback(orderController.payment_logs))
router.delete('/orders/:id', controllerCallback(orderController.delete))


module.exports = router;
