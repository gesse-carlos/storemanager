const connection = require('./connection');

const add = async (name, quantity) => {
  const [row] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?);',
    [name, quantity],
  );

  return { id: row.insertId, name, quantity };
};

const getAll = async () => {
  const [row] = await connection.execute(
    'SELECT * FROM products;',
  );

  return row;
};

const getById = async (id) => {
  const [[row]] = await connection.execute(
    `SELECT * FROM products
      WHERE id = ?;
    `,
    [id],
  );

  return row;
};

const update = async (id, name, quantity) => {
  const [[row]] = await connection.execute(
    `UPDATE products
      SET name = ?, quantity = ?
      WHERE id = ?
    `,
    [name, quantity, id],
  );

  return row;
};

const remove = async (id) => {
  const product = await getById(id);

  await connection.execute(
    `DELETE FROM products
      WHERE id = ?
    `,
    [id],
  );

  return product;
};

module.exports = {
  add,
  getAll,
  getById,
  update,
  remove,
};