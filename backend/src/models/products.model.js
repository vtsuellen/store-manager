const camelize = require('camelize');
const connection = require('./connection');

const getProductsModel = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');
  return camelize(result);
};

const getProductsByIdModel = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', 
    [id],
  );
  return camelize(result);
};

module.exports = {
  getProductsModel,
  getProductsByIdModel,
};