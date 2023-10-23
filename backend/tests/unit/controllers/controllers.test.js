const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsServices = require('../../../src/services/products.services');
const statusCode = require('../../../src/utils/statuscode');
const productsControllers = require('../../../src/controllers/products.controllers');

describe('Controllers Products', function () {
  it('Returning a failed product - 404', async function () {
    const req = {
      params: { id: 777 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };

    sinon.stub(productsServices, 'getProductByIdService').resolves({ type: statusCode.NOT_FOUND, message: 'Product not found' });

    await productsControllers.getProductByIdController(req, res);
    expect(res.status).to.have.been.calledWith(statusCode.NOT_FOUND);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    sinon.restore();
  });
  it('catch', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };

    sinon.stub(productsServices, 'getProductByIdService').resolves({ type: statusCode.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' });

    await productsControllers.getProductByIdController(req, res);
    expect(res.status).to.have.been.calledWith(statusCode.INTERNAL_SERVER_ERROR);
    expect(res.json).to.have.been.calledWith({ message: 'Internal Server Error' });
    sinon.restore();
  });
  it('create error BAD_REQUEST', async function () {
    const req = {
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
  
    const response = {
      type: statusCode.BAD_REQUEST, 
      message: statusCode.BAD_REQUEST,
    };
  
    sinon.stub(productsServices, 'createProductService').resolves(response);
  
    await productsControllers.createProductController(req, res);
    expect(res.status).to.have.been.calledWith(response.type);
    expect(res.json).to.have.been.calledWith({ message: response.message });
    sinon.restore();
  });
  it('create error UNPROCESSABLE_ENTITY ', async function () {
    const req = {
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };

    sinon.stub(productsServices, 'createProductService').resolves({ type: statusCode.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' });

    await productsControllers.getProductByIdController(req, res);
    expect(res.status).to.have.been.calledWith(statusCode.INTERNAL_SERVER_ERROR);
    expect(res.json).to.have.been.calledWith({ message: 'Internal Server Error' });
    sinon.restore();
  });
});