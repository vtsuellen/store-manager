const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const connection = require('../../../src/models/connection');
const { mockProducts } = require('../mocks/product.mock');
const { getProductsModel, getProductsByIdModel } = require('../../../src/models/products.model');

describe('Models Products', function () {
  it('getProductsModel function returns all products', async function () {
    sinon.stub(connection, 'execute').resolves(mockProducts);
    await getProductsModel();
    expect(connection.execute.called).to.be.equal(true);
    sinon.restore();
  });
  it('getProductByIdModel function returns product by id', async function () {
    sinon.stub(connection, 'execute').resolves(mockProducts);
    await getProductsByIdModel(1);
    expect(connection.execute.called).to.be.equal(true);
    sinon.restore();
  });
});