const connection = require('./connection');

const getSalesMode = async () => {
  const [sales] = await connection.execute(
    `SELECT
  sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
  FROM sales_products AS sp
  INNER JOIN sales AS s
  ON s.id = sp.sale_id
  ORDER BY sp.sale_id ASC, sp.product_id ASC;`,
  );
  return (sales);
};
const getSalesByIdModel = async (id) => {
  const [sales] = await connection.execute(`SELECT
  s.date, sp.product_id AS productId, sp.quantity
  FROM sales AS s
  INNER JOIN sales_products AS sp
  ON s.id = sp.sale_id
  WHERE s.id = ?
  ORDER BY sp.product_id ASC;`, [id]);
  return (sales);
};

const RegisterSaleModel = async () => {
  const [data] = await connection.execute('INSERT INTO sales VALUES ()');
  return data.insertId;
};

const RegisterNewSaleModel = async (saleId, productId, quantity) => {
  await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
};

module.exports = {
  getSalesMode,
  getSalesByIdModel,
  RegisterSaleModel,
  RegisterNewSaleModel,
};