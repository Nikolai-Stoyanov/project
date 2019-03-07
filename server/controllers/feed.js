const DogFood = require('../models/DogFood');

module.exports = {
  getDogFood: (req, res) => {
    DogFood.find()
      .then((dogfood) => {
        res
          .status(200)
          .json({ message: 'Fetched dogfood successfully.', dogfood });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  createDogFood: (req, res) => {
    const dogFoodObj = req.body;
    DogFood.create(dogFoodObj)
    .then((dogFood) => {
      res.status(200)
        .json({
          message: 'DogFood created successfully!',
          dogFood
        })
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
  }
}