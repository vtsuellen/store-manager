const { getSalesMode,
  getSalesByIdModel, RegisterNewSaleModel, RegisterSaleModel } = require('../models/sales.model');
const statusCode = require('../utils/statuscode');
const { getProductByIdService } = require('./products.services');

const getSalesServices = async () => {
  const sales = await getSalesMode();
  return { type: statusCode.OK, message: sales };
};
const getSalesByIdServices = async (id) => {
  const sale = await getSalesByIdModel(id);
  
  if (!sale.length || sale.length === 0) { 
    return { type: statusCode.NOT_FOUND, message: 'Sale not found' }; 
  }
  return { type: statusCode.OK, message: sale };
};

const validateNewSalesServices = async (itemsSold) => {
  if (!itemsSold.every((item) => item.productId)) { 
    return { type: statusCode.BAD_REQUEST, message: '"productId" is required' };
  }
  if (!itemsSold.every((item) => item.quantity || item.quantity === 0)) {
    return { type: statusCode.BAD_REQUEST, message: '"quantity" is required' };
  }
  if (!itemsSold.every((item) => item.quantity > 0)) {
    return { type: statusCode.UNPROCESSABLE_ENTITY, 
      message: '"quantity" must be greater than or equal to 1' };
  }
  const products = await Promise.all(itemsSold.map(async (item) => {
    const product = await getProductByIdService(item.productId);
    return product;
  }));
  if (!products.every((product) => product.type === statusCode.OK)) {
    return { type: statusCode.NOT_FOUND, message: 'Product not found' };
  }
 
  return false;
};

const registerNewSalesServices = async (itemsSold) => {
  const validate = await validateNewSalesServices(itemsSold);
  if (validate) return validate;
  const id = await RegisterSaleModel();

  itemsSold.map(async (salesProducts) => {
    const { productId, quantity } = salesProducts;
    await RegisterNewSaleModel(id, productId, quantity);
  });
  return { type: statusCode.CREATED, message: { id, itemsSold } };
};

module.exports = {
  getSalesServices,
  getSalesByIdServices,
  registerNewSalesServices,
};