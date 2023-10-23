const { Router } = require('express');
const {
  getProductsController,
  getProductByIdController,
  createProductController,
} = require('../controllers/products.controllers');

const router = Router();

router.get('/', getProductsController);
router.get('/:id', getProductByIdController);
router.post('/', createProductController);

module.exports = router;