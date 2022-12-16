const {
  getAllActiveContracts,
  getContract,
  checkIfContractbelongs,
  checkIfProfileExists,
} = require('../database/repositories/contract');

const getActiveContracts = async () => await getAllActiveContracts();

const getContractsById = async (id, userId) => {
  const belongs = await checkIfContractbelongsToProfile(id, userId);
  const exists = await checkIfProfileExists(id);

  if (!exists) {
    let error = new Error(`Not found`);
    error.statusCode = 404;
    throw error;
  }

  if (belongs) {
    const contract = await getContract(id);
    return contract;
  } else {
    let error = new Error(`Forbidden`);
    error.statusCode = 403;
    throw error;
  }
};

const checkIfContractbelongsToProfile = async (id, userId) =>
  await checkIfContractbelongs(id, userId);

module.exports = {
  getActiveContracts,
  getContractsById,
};
