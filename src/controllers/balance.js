const { deposit } = require('../services/balance');

const depositToAClient = async (req, res) => {
  // const user = req.profile;
  const clientId = req.params.userId;
  const quantity = parseFloat(req.headers.quantity);

  try {
    const client = await deposit(clientId, quantity);
    res.json(client);
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
  depositToAClient,
};
