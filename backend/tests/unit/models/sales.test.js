const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const connection = require('../../../src/models/connection');
const { getSalesMode, getSalesByIdModel, RegisterSaleModel, RegisterNewSaleModel } = require('../../../src/models/sales.model');

/*
 sale mock
 {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
*/

const getSalesMock = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const createSaleMock = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const createSaleMockResult = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

describe('Sale model testss', function () {
//  make tests with stub mock  getSalesMode, createSale
  it('getSalesMode function returns all sales', async function () {
    sinon.stub(connection, 'execute').resolves(getSalesMock);
    await getSalesMode();
    expect(connection.execute.called).to.be.equal(true);
    sinon.restore();
  });
  it('getSalesByIdModel function returns sale by id', async function () {
    sinon.stub(connection, 'execute').resolves(getSalesMock);
    await getSalesByIdModel(1);
    expect(connection.execute.called).to.be.equal(true);
    sinon.restore();
  });
  it('RegisterSaleModel function returns sale by id', async function () {
    sinon.stub(connection, 'execute').resolves(createSaleMock);
    await RegisterSaleModel(1, 1);
    expect(connection.execute.called).to.be.equal(true);
    sinon.restore();
  });
  it('RegisterNewSaleModel function returns sale by id', async function () {
    sinon.stub(connection, 'execute').resolves(createSaleMockResult);
    await RegisterNewSaleModel(createSaleMock);
    expect(connection.execute.called).to.be.equal(true);
    sinon.restore();
  });
});