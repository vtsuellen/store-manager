const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const salesControllers = require('../../../src/controllers/sales.controllers');
const salesServices = require('../../../src/services/sales.services');
const statusCode = require('../../../src/utils/statuscode');

describe('Sales Controller', function () {
  it('Error internal server', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };

    sinon.stub(salesServices, 'getSalesServices').resolves({ type: statusCode.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' });

    await salesControllers.getSalesByIdController(req, res);
    expect(res.status).to.have.been.calledWith(statusCode.INTERNAL_SERVER_ERROR);
    expect(res.json).to.have.been.calledWith({ error: statusCode.INTERNAL_SERVER_ERROR });
    sinon.restore();
  });
  it('Error - not found', async function () {
    const req = {
      params: {
        id: 777,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };

    sinon.stub(salesServices, 'getSalesByIdServices').resolves({ type: statusCode.NOT_FOUND, message: 'Sale not found' });

    await salesControllers.getSalesByIdController(req, res);

    expect(res.status).to.have.been.calledWith(statusCode.NOT_FOUND);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });
  it('Error internal server Register', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };

    sinon.stub(salesServices, 'registerNewSalesServices').resolves({ type: statusCode.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' });

    await salesControllers.RegisterNewSalesController(req, res);
    expect(res.status).to.have.been.calledWith(statusCode.INTERNAL_SERVER_ERROR);
    expect(res.json).to.have.been.calledWith({ error: statusCode.INTERNAL_SERVER_ERROR });
    sinon.restore();
  });
});