const { Router } = require('express');
const { getSalesController, getSalesByIdController } = require('../controllers/sales.controllers');

const routerSales = Router();

routerSales.get('/', getSalesController);
routerSales.get('/:id', getSalesByIdController);

module.exports = routerSales;