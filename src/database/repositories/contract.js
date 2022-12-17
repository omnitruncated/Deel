const { Contract } = require('../models/model');
const { Op } = require('sequelize');

const getAllActiveContracts = async () =>
  Contract.findAll({
    where: { status: { [Op.not]: 'terminated' } },
  });

const getAllActiveContractsByUserId = async (userId) =>
  Contract.findAll({
    where: { ClientId: userId, status: { [Op.not]: 'terminated' } },
  });

const getContract = async (id, userId) =>
  Contract.findOne({
    where: { id },
    [Op.or]: [{ contractorId: userId }, { clientId: userId }],
  });

const checkIfProfileExists = async (id) =>
  Contract.count({
    where: { id },
  }).then((count) => {
    if (count >= 1) {
      return true;
    } else {
      return false;
    }
  });

const checkIfContractbelongs = async (id, userId) =>
  Contract.count({
    where: {
      id: id,
      [Op.or]: [{ ContractorId: userId }, { ClientId: userId }],
    },
  }).then((count) => {
    if (count === 0) {
      return false;
    }
    return true;
  });

module.exports = {
  getAllActiveContractsByUserId,
  getAllActiveContracts,
  checkIfContractbelongs,
  checkIfProfileExists,
  getContract,
};
