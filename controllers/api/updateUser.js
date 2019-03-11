
const updateUserData = (req, res) => {
  const userId =  req.params.id;
  res.json({ name: 'vasya' })
};

module.exports = updateUserData;
