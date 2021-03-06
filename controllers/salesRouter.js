const Sales = require('express').Router();

const { validateSales:
  {
    validateProductId,
    validateSales,
    validateProductQuantity,
  },
} = require('./middlewares');
const { add, getAll, getById, update, remove } = require('./salesController');

Sales.post(
  '/',
  validateProductId,
  validateSales,
  validateProductQuantity,
  add,
);

Sales.get(
  '/',
  getAll,
);

Sales.get(
  '/:id',
  getById,
);

Sales.put(
  '/:id',
  validateProductId,
  validateSales,
  validateProductQuantity,
  update,
);

Sales.delete(
  '/:id',
  remove,
);

module.exports = Sales;