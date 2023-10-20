const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsServices = require('../../../src/services/products.services');
const statusCode = require('../../../src/utils/statuscode');
const productsControllers = require('../../../src/controllers/products.controllers');
// const { mockProducts, mockProductsId } = require('../mocks/product.mock');

describe('controllers', function () {
  // it('Returning all products successfully', async function () {
  //   const req = {};
  //   const res = {
  //     status: sinon.stub().returnsThis(),
  //     json: sinon.stub(),
  //   };

  //   sinon.stub(productsServices, 'getProductsService').resolves({ type: statusCode.OK, message: mockProducts });

  //   await productsControllers.getProductsController(req, res);
  //   expect(res.status).to.have.been.calledWith(statusCode.OK);
  //   expect(res.json).to.have.been.calledWith(mockProducts);
  // });
  // it('Returning a product successfully', async function () {
  //   const req = {
  //     params: { id: 1 },
  //   };
  //   const res = {
  //     status: sinon.stub().returnsThis(),
  //     json: sinon.stub().returns(),
  //   };

  //   sinon.stub(productsServices, 'getProductByIdService').resolves({ type: statusCode.OK, message: mockProductsId });

  //   await productsControllers.getProductByIdController(req, res);
  //   expect(res.status).to.have.been.calledWith(statusCode.OK);
  //   expect(res.json).to.have.been.calledWith(mockProductsId);
  //   sinon.restore();
  // });
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
});