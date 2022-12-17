const { getAllUnpaidJobs, updateJob } = require('../services/job');

const getUnpaidJobs = async (req, res) => {
  try {
    const jobs = await getAllUnpaidJobs();
    res.json(jobs);
  } catch (error) {
    return res.status(404).end();
  }
};

const updateJobById = async (req, res) => {
  const id = req.params.job_id;
  const client = req.profile;

  try {
    const job = await updateJob(id, client);
    res.json(job);
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
  getUnpaidJobs,
  updateJobById,
};
