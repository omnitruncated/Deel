const {
  getAllActiveContractsByUserId,
} = require('../database/repositories/contract');
const { getUnpaidJobsByContractId } = require('../database/repositories/job');
const { payment, getProfileById } = require('../database/repositories/profile');

const deposit = async (clientId, quantity) => {
  const user = await getProfileById(clientId);

  if (!user) {
    let error = new Error(`User doesn't exist`);
    error.statusCode = 404;
    throw error;
  }

  const contracts = await getAllActiveContractsByUserId(clientId);

  const unpaidClientJobsPromises = contracts.map(async (c) => {
    return await getUnpaidJobsByContractId(c.id);
  });
  const unpaidClientJobs = (await Promise.all(unpaidClientJobsPromises)).flat();

  let totalJobsToPay = 0;
  if (unpaidClientJobs.length > 0) {
    totalJobsToPay =
      unpaidClientJobs.length > 1
        ? unpaidClientJobs.reduce((a, b) => a.price + b.price)
        : unpaidClientJobs[0].price;
  }

  const allowedAmount = await checkClientElegibilityToDeposit(totalJobsToPay);

  if (quantity > allowedAmount) {
    let error = new Error(
      `Sorry you can't deposit more than $${allowedAmount}`
    );
    error.statusCode = 400;
    throw error;
  } else {
    const newBalance = user.balance + quantity;
    return await payment(clientId, newBalance);
  }
};

const checkClientElegibilityToDeposit = async (totalJobsToPay) => {
  const percent = 25;
  return totalJobsToPay * (percent / 100);
};

module.exports = {
  deposit,
};
