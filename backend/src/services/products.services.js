const statusCode = require('../utils/statuscode');
const { getProductsByIdModel, getProductsModel } = require('../models/products.model');

const getProductsService = async () => {
  const allProducts = await getProductsModel();
  return { type: statusCode.OK, message: allProducts };
};

const getProductByIdService = async (id) => {
  const product = await getProductsByIdModel(id);
  if (!product || product.length === 0) {
    return { type: statusCode.NOT_FOUND, message: 'Product not found' };
  }
  return { type: statusCode.OK, message: product[0] };
};

module.exports = {
  getProductsService,
  getProductByIdService,
};