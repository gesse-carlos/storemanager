const rescue = require('express-rescue');

const salesService = require('../service/salesService');

const add = rescue(async (req, res) => {
  const sale = await salesService.add(req.body);

  res.status(201).json({
    id: sale.insertId,
    itemsSold: req.body,
  });
});

const getAll = rescue(async (req, res) => {
  const sales = await salesService.getAll();

  res.status(200).json(sales);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;

  const sale = await salesService.getById(id);

  if (!sale.length) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json(sale);
});

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const [product] = req.body;

  const sale = await salesService.getById(id);
  if (!sale) return res.status(404).json({ message: 'Sale not found' });

  await salesService.update(product);

  res.status(200).json({ saleId: id, itemUpdated: req.body });
});

const remove = rescue(async (req, res) => {
  const { id } = req.params;

  const sale = await salesService.getById(id);
  if (!sale.length) return res.status(404).json({ message: 'Sale not found' });

  await salesService.remove(id);

  res.status(200).json(sale);
});

module.exports = {
  add,
  getAll,
  getById,
  update,
  remove,
};