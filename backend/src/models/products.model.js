const connection = require('./connection');

const getProductsModel = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');
  return result;
};

const getProductsByIdModel = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', 
    [id],
  );
  return result;
};

const createProductModel = async (productName) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [productName],
  );
  return result;
};

module.exports = {
  getProductsModel,
  getProductsByIdModel,
  createProductModel,
};