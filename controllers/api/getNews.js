
const get = (req, res) => {
  console.log('news');
  res.json({ name: 'vasya' })
};

module.exports = {
  get
};
