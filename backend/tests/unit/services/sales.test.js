const { describe, it } = require('node:test');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const statusCode = require('../../../src/utils/statuscode');
const { getSalesByIdServices } = require('../../../src/services/sales.services');

const { expect } = chai;
chai.use(sinonChai);

describe('Services Sales', function () {
  it('Sales not found', async function () {
    const result = await getSalesByIdServices(9999);
    expect(result).to.deep.equal({ type: statusCode.NOT_FOUND, message: 'Sale not found' });
  });
});