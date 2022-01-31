const { salesModel } = require('../models');
const productsService = require('./productsService');

const add = async (sales) => salesModel.add(sales);

const getAll = async () => salesModel.getAll();

const getById = async (id) => salesModel.getById(id);

const update = async ({ product_id: id, quantity }) => salesModel.update(id, quantity);

const updateProductQuantity = async (sales) => {
  const updateQuantity = sales.map(async (sale) => {
    const { product_id: id, quantity: saleQuantity } = sale;

    const product = await productsService.getById(id);
    product.quantity -= saleQuantity;

    await productsService.update(product);
  });
  await Promise.all(updateQuantity);

  const createSale = await add(sales);

  return createSale;
};

module.exports = {
  add: updateProductQuantity,
  getAll,
  getById,
  update,
};