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
  },

  editDogFood: (req, res) => {
    const dogFoodId = req.params.id
    const dogFoodObj = req.body;
    DogFood.findById(dogFoodId)
      .then((dogFood) => {
        dogFood.title = dogFoodObj.title
        dogFood.brand = dogFoodObj.brand
        dogFood.imageUrl = dogFoodObj.imageUrl
        dogFood.foodType = dogFoodObj.foodType
        dogFood.dogAge = dogFoodObj.dogAge
        dogFood.description = dogFoodObj.description
        dogFood.size = dogFoodObj.size
        dogFood.price = dogFoodObj.price

        dogFood
          .save()
          .then(editedFood => {
            res.status(200)
              .json({
                message: 'DogFood edited successfully!',
                dogFood: editedFood
              })
          })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },

  deleteDogFood: (req, res) => {
    const dogFoodId = req.params.id
    DogFood.findById(dogFoodId)
      .then((dogFood) => {
        dogFood.remove()
          .then(()=> {
            return res.status(200)
              .json({
                message: 'DogFood deleted successfully!'
              })
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