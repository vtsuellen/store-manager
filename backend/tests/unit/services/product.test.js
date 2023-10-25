const { describe, it } = require('node:test');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const productsServices = require('../../../src/services/products.services');
const statusCode = require('../../../src/utils/statuscode');

const { expect } = chai;
chai.use(sinonChai);

describe('Services Products', function () {
  it('createProductService error', async function () {
    const result = await productsServices.createProductService({ name: '<5' });
    expect(result).to.deep.equal({ type: statusCode.UNPROCESSABLE_ENTITY, message: '"name" length must be at least 5 characters long' });
  });
  it('create product service sucess', async function () {
    const result = await productsServices.createProductService({ name: 'ABCDEF' });
    expect(result).to.deep.equal({ type: statusCode.CREATED, message: { id: 1, name: 'ABCDEF' } });
  });
  it('Error - name is required', async function () {
    const result = await productsServices.updateProductService(1, ''); 
    expect(result).to.deep.equal({ type: statusCode.BAD_REQUEST, message: '"name" is required' });
    sinon.restore();
  });
  it('Error - name length must be at least 5 characters long', async function () {
    const result = await productsServices.updateProductService(2, 'ABC');
    expect(result).to.deep.equal({ type: statusCode.UNPROCESSABLE_ENTITY, message: '"name" length must be at least 5 characters long' });
    sinon.restore();
  });  
  it('Error - Product not found Upadate', async function () {
    const result = await productsServices.updateProductService(999, 'DCEIU');
    expect(result).to.deep.equal({ type: statusCode.NOT_FOUND, message: 'Product not found' });
  });  
  it('Error - Product not found', async function () {
    const result = await productsServices.deleteProductService(999);
    expect(result).to.deep.equal({ type: statusCode.NOT_FOUND, message: 'Product not found' });
  });
  it('Error name is required', async function () {
    const result = await productsServices.createProductService({ name: '' });
    expect(result).to.deep.equal({ type: statusCode.BAD_REQUEST, message: '"name" is required' });
  });
});