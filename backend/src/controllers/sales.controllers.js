const { getSalesByIdServices, 
  getSalesServices, registerNewSalesServices } = require('../services/sales.services');
const statusCode = require('../utils/statuscode');

const getSalesController = async (_req, res) => {
  try {
    const { type, message } = await getSalesServices();
    return res.status(type).json(message);
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ error: statusCode.INTERNAL_SERVER_ERROR });
  }
};

const getSalesByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, message } = await getSalesByIdServices(id);
    if (type === statusCode.NOT_FOUND) return res.status(type).json({ message });
    return res.status(type).json(message);
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ error: statusCode.INTERNAL_SERVER_ERROR });
  }
};

const RegisterNewSalesController = async (req, res) => {
  try {
    const { type, message } = await registerNewSalesServices(req.body);
    if (type === statusCode.CREATED) return res.status(type).json(message);
    return res.status(type).json({ message });
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ error: statusCode.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  getSalesController,
  getSalesByIdController,
  RegisterNewSalesController,
};