const Order = require('../models/Order');

module.exports = {
  getOrder: (req, res) => {
    Order.find()
      .then((order) => {
        res
          .status(200)
          .json({ message: 'Fetched order successfully.', order });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },

  createOrder: (req, res,next) => {
    const orderObj = req.body;
    Order.create(orderObj)
      .then((order) => {
        res.status(200)
          .json({
            message: 'Order created successfully!',
            order
          })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },

  deleteOrder: (req, res) => {
    const orderId = req.params.id
    DogFood.findById(orderId)
      .then((order) => {
        order.remove()
          .then(()=> {
            return res.status(200)
              .json({
                message: 'Order deleted successfully!'
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