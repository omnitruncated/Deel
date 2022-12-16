const { Profile } = require('../models/model');

const payment = async (id, newBalance) =>
  Profile.update({ balance: newBalance }, { where: { id } });

const getProfileById = async (id) =>
  await Profile.findOne({
    where: { id },
  });

module.exports = {
  payment,
  getProfileById,
};
