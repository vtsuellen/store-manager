const { Router } = require('express');
const {
  getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
} = require('../controllers/products.controllers');

const router = Router();

router.get('/', getProductsController);
router.get('/:id', getProductByIdController);
router.post('/', createProductController);
router.put('/:id', updateProductController);
router.delete('/:id', deleteProductController);

module.exports = router;