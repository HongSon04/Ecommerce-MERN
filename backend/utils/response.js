module.exports.responseReturn = (req, code, data) => {
  return req.status(code).json(data);
};
