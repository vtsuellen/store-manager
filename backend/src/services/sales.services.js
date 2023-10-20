const { getSalesMode, getSalesByIdModel } = require('../models/sales.model');
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

module.exports = {
  getSalesServices,
  getSalesByIdServices,
};