const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const connection = require('../../../src/models/connection');
const { mockProducts } = require('../mocks/product.mock');
const { getProductsModel, getProductsByIdModel } = require('../../../src/models/products.model');

describe('Models', function () {
  it('1 - tests if getAllProductsModel function returns all products', async function () {
    sinon.stub(connection, 'execute').resolves(mockProducts);
    await getProductsModel();
    expect(connection.execute.called).to.be.equal(true);
    sinon.restore();
  });
  it('2 - tests if getAllProductByIdModel function returns product by id', async function () {
    sinon.stub(connection, 'execute').resolves(mockProducts);
    await getProductsByIdModel(1);
    expect(connection.execute.called).to.be.equal(true);
    sinon.restore();
  });
});