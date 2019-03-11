const router = require('express').Router();
const orderController = require('../controllers/order');
const isAuth = require('../middleware/is-auth');


router.get('/order', orderController.getOrder);
router.post('/order/create', orderController.createOrder);
router.delete('/order/delete/:id', orderController.deleteOrder);

module.exports = router;