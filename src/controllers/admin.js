const {
  getHighestPaidProfession,
  getHighestPaymentClients,
} = require('../services/admin');

const getBestProfession = async (req, res) => {
  const start = req.query.start;
  const end = req.query.end;
  try {
    const profession = await getHighestPaidProfession(start, end);
    res.json(profession);
  } catch (error) {
    return res
      .status(error.statusCode)
      .send({
        message: error.message,
      })
      .end();
  }
};

const getBestClients = async (req, res) => {
  const start = req.query.start;
  const end = req.query.end;
  const limit = req.query.limit;

  try {
    const clients = await getHighestPaymentClients(start, end, limit);
    res.json(clients);
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
  getBestProfession,
  getBestClients,
};
