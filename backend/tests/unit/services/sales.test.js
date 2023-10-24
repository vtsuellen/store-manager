const { describe, it } = require('node:test');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const statusCode = require('../../../src/utils/statuscode');
const { getSalesByIdServices, registerNewSalesServices } = require('../../../src/services/sales.services');

const { expect } = chai;
chai.use(sinonChai);

describe('Services Sales', function () {
  it('Sales not found', async function () {
    const result = await getSalesByIdServices(9999);
    expect(result).to.deep.equal({ type: statusCode.NOT_FOUND, message: 'Sale not found' });
  });
  it('Error -  productId is required', async function () {
    const result = await registerNewSalesServices([{ quantity: 1 }]);
    expect(result).to.deep.equal({ type: statusCode.BAD_REQUEST, message: '"productId" is required' });
  });
  it('Error - quantity must be greater than or equal to 1', async function () {
    const result = await registerNewSalesServices([{ productId: 1, quantity: 0 }]);
    expect(result).to.deep.equal({ type: statusCode.UNPROCESSABLE_ENTITY, 
      message: '"quantity" must be greater than or equal to 1' });
  });
  it('Error - Product not found', async function () {
    const result = await registerNewSalesServices([{ productId: 9999, quantity: 1 }]);
    expect(result).to.deep.equal({ type: statusCode.NOT_FOUND, message: 'Product not found' });
  });
});