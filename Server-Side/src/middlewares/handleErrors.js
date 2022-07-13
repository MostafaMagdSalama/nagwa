const handleErrors = (err, req, res, next) => {
    console.log("errorrrr",err)
  res.json({ message: err.message, status: err.status });
  next(err);
};
module.exports = handleErrors;
