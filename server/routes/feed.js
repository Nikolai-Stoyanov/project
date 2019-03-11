const router = require('express').Router();
const feedController = require('../controllers/feed');
//const isAuth = require('../middleware/is-auth');


router.get('/dogFood', feedController.getDogFood);
router.post('/dogFood/create',  feedController.createDogFood);
router.post('/dogFood/edit/:id', feedController.editDogFood);
router.delete('/dogFood/delete/:id', feedController.deleteDogFood);

module.exports = router;