const { salesModel } = require('../models');

const add = async (sales) => salesModel.add(sales);

const getAll = async () => salesModel.getAll();

const getById = async (id) => salesModel.getById(id);

const update = async (id, quantity) => salesModel.update(id, quantity);

module.exports = {
  add,
  getAll,
  getById,
  update,
};