const statusCode = require('../utils/statuscode');
const { getProductsByIdModel,
  getProductsModel,
  createProductModel,
  updateProductModel, deleteProductModel } = require('../models/products.model');

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

const updateProductService = async (id, name) => {
  if (!name) return { type: statusCode.BAD_REQUEST, message: '"name" is required' };
  if (name.length < 5) {
    return {
      type: statusCode.UNPROCESSABLE_ENTITY,
      message: '"name" length must be at least 5 characters long',
    }; 
  }
  const existingProduct = await getProductByIdService(id);
  if (existingProduct.type === statusCode.NOT_FOUND) {
    return { type: statusCode.NOT_FOUND, message: 'Product not found' };
  }
  await updateProductModel(id, name);
  return { type: statusCode.OK, message: { id, name } };
};

const deleteProductService = async (id) => {
  const existingProduct = await getProductByIdService(id);
  if (existingProduct.type === statusCode.NOT_FOUND) {
    return { type: statusCode.NOT_FOUND, message: 'Product not found' };
  }
  await deleteProductModel(id);
  return { type: statusCode.NO_CONTENT };
};

module.exports = {
  getProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
};