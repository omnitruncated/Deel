const { Job } = require('../../database/models/model');

const getUnpaidJobs = async () => await Job.findAll({ where: { paid: null } });
const getUnpaidJobsByUserId = async (userId) =>
  await Job.findAll({ where: { id: userId, paid: null } });

const getUnpaidJobsByContractId = async (id) =>
  await Job.findAll({ where: { ContractId: id, paid: null } });

const getJobById = async (id) => Job.findOne({ where: { id } });

const updateJobById = async (id) => {
  return await Job.update(
    { paid: 1, paymentDate: Date.now() },
    { where: { id } }
  );
};

module.exports = {
  getUnpaidJobs,
  updateJobById,
  getJobById,
  getUnpaidJobsByUserId,
  getUnpaidJobsByContractId,
};
