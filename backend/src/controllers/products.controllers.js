const { getProductsService,
  getProductByIdService,
  createProductService, 
  updateProductService, deleteProductService } = require('../services/products.services');
const statusCode = require('../utils/statuscode');

const getProductsController = async (_req, res) => {
  const { type, message } = await getProductsService();
  return res.status(type).json(message);
};

const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, message } = await getProductByIdService(id);
    
    if (type === statusCode.NOT_FOUND) {
      return res.status(type).json({ message });
    }

    return res.status(type).json(message);
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error' });
  }
};

const createProductController = async (req, res) => {
  try {
    const product = req.body;
    const { type, message } = await createProductService(product);

    if (type === statusCode.BAD_REQUEST || type === statusCode.UNPROCESSABLE_ENTITY) {
      return res.status(type).json({ message });
    }
    return res.status(type).json(message);
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error' });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { type, message } = await updateProductService(id, name);
    if (type === statusCode.OK) {
      return res.status(type).json({ id: Number(id), name });
    }
    return res.status(type).json({ message });
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ error });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, message } = await deleteProductService(id);
    if (type === statusCode.NOT_FOUND) {
      return res.status(type).json({ message });
    }
    return res.status(type).json(message);
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ error });
  }
};

module.exports = {
  getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
};