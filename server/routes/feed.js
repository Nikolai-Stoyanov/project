const router = require('express').Router();
const feedController = require('../controllers/feed');
const orderController = require('../controllers/order');
//const isAuth = require('../middleware/is-auth');


router.get('/dogFood', feedController.getDogFood);
router.post('/dogFood/create',  feedController.createDogFood);
router.post('/dogFood/edit/:id', feedController.editDogFood);
router.delete('/dogFood/delete/:id', feedController.deleteDogFood);

router.get('/order', orderController.getOrder);
router.post('/order/create', orderController.createOrder);
router.delete('/order/delete/:id', orderController.deleteOrder);

module.exports = router;