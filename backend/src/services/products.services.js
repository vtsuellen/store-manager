const statusCode = require('../utils/statuscode');
const { getProductsByIdModel,
  getProductsModel, createProductModel } = require('../models/products.model');

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

const createProductService = async (product) => {
  if (!product.name) return { type: statusCode.BAD_REQUEST, message: '"name" is required' };
  if (product.name.length < 5) {
    return {
      type: statusCode.UNPROCESSABLE_ENTITY,
      message: '"name" length must be at least 5 characters long',
    }; 
  }
  const result = await createProductModel(product.name);
  const { insertId } = result;

  return { type: statusCode.CREATED, message: { id: insertId, name: product.name } };
};

module.exports = {
  getProductsService,
  getProductByIdService,
  createProductService,
};