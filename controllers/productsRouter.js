const Products = require('express').Router();

const { validateProducts:
  {
    validateProduct,
    validateName,
    validateQuantity,
  },
} = require('./middlewares');
const { add, getAll, getById, update, remove } = require('./productsController');

Products.post(
  '/',
  validateQuantity,
  validateName,
  add,
);

Products.get(
  '/',
  getAll,
);

Products.get(
  '/:id',
  validateProduct,
  getById,
);

Products.put(
  '/:id',
  validateProduct,
  validateQuantity,
  validateName,
  update,
);

Products.delete(
  '/:id',
  validateProduct,
  remove,
);

module.exports = Products;