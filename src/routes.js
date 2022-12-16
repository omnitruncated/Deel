const express = require('express');
const { getProfile } = require('./middleware/getProfile');
const { depositToAClient } = require('./controllers/balance');
const { getContractById, getContracts } = require('./controllers/contract');
const { getUnpaidJobs, updateJobById } = require('./controllers/job');
const router = express.Router();

router.get('/contracts/:id', getProfile, getContractById);
router.get('/contracts', getProfile, getContracts);
router.get('/jobs/unpaid', getProfile, getUnpaidJobs);
router.post('/jobs/:job_id/pay', getProfile, updateJobById);
router.post('/balances/deposit/:userId', getProfile, depositToAClient);
// //GET /admin/best-profession?start=<date>&end=<date>
router.get('/admin/best-profession', getProfile);
// //GET /admin/best-clients?start=<date>&end=<date>&limit=<integer>
router.get('/admin/best-clients', getProfile);

module.exports = router;
