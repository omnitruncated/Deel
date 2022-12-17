const express = require('express');
const { getProfile } = require('./middleware/getProfile');
const { depositToAClient } = require('./controllers/balance');
const { getContractById, getContracts } = require('./controllers/contract');
const { getUnpaidJobs, updateJobById } = require('./controllers/job');
const { getBestProfession, getBestClients } = require('./controllers/admin');
const router = express.Router();

router.get('/contracts/:id', getProfile, getContractById);
router.get('/contracts', getProfile, getContracts);
router.get('/jobs/unpaid', getProfile, getUnpaidJobs);
router.post('/jobs/:job_id/pay', getProfile, updateJobById);
router.post('/balances/deposit/:userId', getProfile, depositToAClient);
router.get('/admin/best-profession', getProfile, getBestProfession);
router.get('/admin/best-clients', getProfile, getBestClients);

module.exports = router;
