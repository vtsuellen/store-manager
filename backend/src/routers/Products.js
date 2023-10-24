const { Router } = require('express');
const {
  getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
} = require('../controllers/products.controllers');

const router = Router();

router.get('/', getProductsController);
router.get('/:id', getProductByIdController);
router.post('/', createProductController);
router.put('/:id', updateProductController);

module.exports = router;