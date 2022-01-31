const connection = require('./connection');

const add = async (sales) => {
  const [row] = connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );

  const salesProducts = sales.map(async ({ product_id: productId, quantity }) => {
    await connection.execute(
      `INSERT INTO sales_products
        (sale_id, product_id, quantity)
        VALUES (?, ?, ?)
      `,
      [row.insertId, productId, quantity],
    );
  });

  await Promise.all(salesProducts);

  return row;
};

const getAll = async () => {
  const [row] = await connection.execute('SELECT * FROM sales');

  return row;
};

const getById = async (id) => {
  const [[row]] = await connection.execute(
    `SELECT * FROM sales
      WHERE id = ?
    `,
    [id],
  );

  return row;
};

const update = async (id, quantity) => {
  await connection.execute(
    `UPDATE sales_products
      SET quantity = ?
      WHERE id = ?
    `,
    [quantity, id],
  );
};

module.exports = {
  add,
  getAll,
  getById,
  update,
};