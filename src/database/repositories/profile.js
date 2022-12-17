const { Op } = require('sequelize');
const { Profile, Contract, Job, sequelize } = require('../models/model');

const payment = async (id, newBalance) => {
  const t = await sequelize.transaction();
  try {
    const profileUpdate = await Profile.update(
      { balance: newBalance },
      { where: { id } },
      { transaction: t }
    ).then(() => Profile.findOne({ where: { id } }));

    await t.commit();
    return profileUpdate;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const getProfileById = async (id) =>
  await Profile.findOne({
    where: { id },
  });

const getHighestPaidContractors = async (start, end) =>
  await Profile.findAll({
    attributes: ['profession', 'firstName', 'lastName'],
    include: [
      {
        model: Contract,
        as: 'Contractor',
        attributes: [],
        required: true,
        include: [
          {
            model: Job,
            required: true,
            attributes: [],
            where: {
              paid: true,
              paymentDate: {
                [Op.between]: [start, end],
              },
            },
          },
        ],
      },
    ],
    where: {
      type: 'contractor',
    },
    group: ['profession'],
    order: [[sequelize.fn('SUM', sequelize.col('balance')), 'DESC']],
  });

const getHighestPaymentClientsProfiles = async (start, end, limit) =>
  await Profile.findAll({
    attributes: [
      'id',
      [sequelize.literal("firstName || ' ' || lastName"), 'fullname'],
      [sequelize.fn('SUM', sequelize.col('balance')), 'paid'],
    ],
    include: [
      {
        model: Contract,
        as: 'Client',
        attributes: [],
        required: true,
        include: [
          {
            model: Job,
            required: true,
            attributes: [],
            where: {
              paid: true,
              paymentDate: {
                [Op.between]: [start, end],
              },
            },
          },
        ],
      },
    ],
    where: {
      type: 'client',
    },
    group: ['clientId'],
    order: [['paid', 'DESC']],

    limit: limit,
    subQuery: false,
  });

module.exports = {
  payment,
  getProfileById,
  getHighestPaidContractors,
  getHighestPaymentClientsProfiles,
};
