const { Router } = require('express');
const {
  getProductsController,
  getProductByIdController,
} = require('../controllers/products.controllers');

const router = Router();

router.get('/', getProductsController);
router.get('/:id', getProductByIdController);

module.exports = router;