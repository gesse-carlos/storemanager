const rescue = require('express-rescue');

const productsService = require('../service/productsService');

const add = rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const product = await productsService.add({ name, quantity });

  res.status(201).json(product);
});

const getAll = rescue(async (req, res) => {
  const products = await productsService.getAll();

  res.status(200).json(products);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);

  res.status(200).json(product);
});

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await productsService.update({ id, name, quantity });

  res.status(200).json(product);
});

const remove = rescue(async (req, res) => {
  const { id } = req.params;

  const product = await productsService.getById(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  await productsService.remove(id);

  res.status(200).json(product);
});

module.exports = {
  add,
  getAll,
  getById,
  update,
  remove,
};