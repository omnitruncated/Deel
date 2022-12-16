const { getContractById } = require('../contract');
const { Contract } = require('../../database/models/model');

describe('getContractById', () => {
  it('should return a contract by id', async () => {
    Contract.findOne = jest.fn(() => ({ id: 1, name: 'Test Contract' }));

    const req = { params: { id: 1 } };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => ({ end: jest.fn() })),
    };

    await getContractById(req, res);
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Test Contract' });
  });

  it('should return a 404 error if the contract does not exist', async () => {
    Contract.findOne = jest.fn(() => null);

    const req = { params: { id: 1 } };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => ({ end: jest.fn() })),
    };

    await getContractById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
