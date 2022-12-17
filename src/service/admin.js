const {
  getHighestPaymentClientsProfiles,
  getHighestPaidContractors,
} = require('../database/repositories/profile');

const getHighestPaidProfession = async (start, end) => {
  start = start ? start : '2020-08-10';
  end = end ? end : '2020-08-17';

  const getHighestContractors = await getHighestPaidContractors(start, end);

  return getHighestContractors;
};

const getHighestPaymentClients = async (start, end, limit) => {
  limit = limit ? parseInt(limit) : 2;
  start = start ? start : '2020-08-10';
  end = end ? end : '2020-08-17';

  const getHighestClients = await getHighestPaymentClientsProfiles(
    start,
    end,
    limit
  );

  return getHighestClients;
};

module.exports = {
  getHighestPaidProfession,
  getHighestPaymentClients,
};
