const { getActiveContracts, getContractsById } = require('../service/contract');

const getContracts = async (req, res) => {
  try {
    const contracts = await getActiveContracts();
    res.json(contracts);
  } catch (error) {
    return res.status(404).end();
  }
};

const getContractById = async (req, res) => {
  const userId = req.headers.profile_id;
  const { id } = req.params;

  try {
    const contract = await getContractsById(id, userId);
    res.json(contract);
  } catch (error) {
    return res
      .status(error.statusCode)
      .send({
        message: error.message,
      })
      .end();
  }
};

module.exports = {
  getContractById,
  getContracts,
};
