const Products = require('express').Router();

const { validateProducts: { validateName, validateQuantity } } = require('./middlewares');
const { add, getAll, getById, update, remove } = require('./productsController');

Products.post(
  '/',
  validateName,
  validateQuantity,
  add,
);

Products.get(
  '/',
  getAll,
);

Products.get(
  '/:id',
  getById,
);

Products.put(
  '/:id',
  validateQuantity,
  update,
);

Products.delete(
  '/:id',
  remove,
);