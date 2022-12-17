const { Job, sequelize } = require('../../database/models/model');

const getUnpaidJobs = async () => await Job.findAll({ where: { paid: null } });
const getUnpaidJobsByUserId = async (userId) =>
  await Job.findAll({ where: { id: userId, paid: null } });

const getUnpaidJobsByContractId = async (id) =>
  await Job.findAll({ where: { ContractId: id, paid: null } });

const getJobById = async (id) => Job.findOne({ where: { id } });

const updateJobById = async (id) => {
  const t = await sequelize.transaction();

  try {
    const jobUpdate = await Job.update(
      { paid: 1, paymentDate: Date.now() },
      { where: { id } },
      { transaction: t }
    );
    await t.commit();

    return jobUpdate;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

module.exports = {
  getUnpaidJobs,
  updateJobById,
  getJobById,
  getUnpaidJobsByUserId,
  getUnpaidJobsByContractId,
};
