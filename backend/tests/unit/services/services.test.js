const { describe, it } = require('node:test');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const productsServices = require('../../../src/services/products.services');
const statusCode = require('../../../src/utils/statuscode');

const { expect } = chai;
chai.use(sinonChai);

describe('Services Products', function () {
  it('createProductService', async function () {
    const result = await productsServices.createProductService({ name: '<5' });
    expect(result).to.deep.equal({ type: statusCode.UNPROCESSABLE_ENTITY, message: '"name" length must be at least 5 characters long' });
  });
  it('test', async function () {
    const result = await productsServices.createProductService({ name: '' });
    expect(result).to.deep.equal({ type: statusCode.BAD_REQUEST, message: '"name" is required' });
  });
});