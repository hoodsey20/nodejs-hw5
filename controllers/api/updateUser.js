
const put = (req, res) => {
  const userId =  req.params.id;
  res.json({ name: 'vasya' })
};

module.exports = {
  put
};
