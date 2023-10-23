const { Router } = require('express');
const { getSalesController,
  getSalesByIdController,
  RegisterNewSalesController } = require('../controllers/sales.controllers');

const routerSales = Router();

routerSales.get('/', getSalesController);
routerSales.get('/:id', getSalesByIdController);
routerSales.post('/', RegisterNewSalesController);

module.exports = routerSales;