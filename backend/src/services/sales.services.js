const { getSalesMode,
  getSalesByIdModel, RegisterNewSaleModel, RegisterSaleModel } = require('../models/sales.model');
const statusCode = require('../utils/statuscode');

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

const registerNewSalesServices = async (itemsSold) => {
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