const { getContract } = require('../database/repositories/contract');
const {
  getUnpaidJobs,
  updateJobById,
  getJobById,
} = require('../database/repositories/job');
const { payment, getProfileById } = require('../database/repositories/profile');

const getAllUnpaidJobs = async () => {
  const jobs = await getUnpaidJobs();
  return jobs;
};

const updateJob = async (id, client) => {
  const job = await getJobById(id);
  const contract = await getContract(job.ContractId, client.id);
  const enoughBalance = await checkIfClientHasAmountToPay(client, job);
  const contractor = await getProfileById(contract.ContractorId);
  const clientBalance = client.balance - job.price;
  const contractorBalance = contractor.balance + job.price;

  const payJob = await Promise.all([
    payment(client.id, clientBalance),
    payment(contractor.id, contractorBalance),
    updateJobById(id),
  ]);

  if (!job) {
    let error = new Error(`Job not found`);
    error.statusCode = 404;
    throw error;
  }

  if (!contract) {
    let error = new Error(
      `Contract not found or user doesn't have a contract for this job`
    );
    error.statusCode = 404;
    throw error;
  }

  if (!enoughBalance) {
    let error = new Error(
      `Client doesn't have enough balance to pay for this job`
    );
    error.statusCode = 400;
    throw error;
  }

  if (!payJob) {
    let error = new Error(`There was a problem with the payment`);
    error.statusCode = 400;
    throw error;
  }

  return await getJobById(id);
};

const checkIfClientHasAmountToPay = async (client, job) => {
  if (client.balance >= job.price) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  getAllUnpaidJobs,
  updateJob,
};
