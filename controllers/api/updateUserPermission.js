const flat = require('flat');

const {
  updateUser,
} = require('../../models/db.js');

const updateUserPermission = (req, res) => {
  const id = req.params.id;
  const { permission } = JSON.parse(req.body);
  console.log('flat(permission)', flat({ permission }));
  updateUser(id, flat({ permission }))
    .then(updatedData => {
      res.json(updatedData);
    })
    .catch(e => {
      res.status(500);
      res.json({ status: false, msg: e.message });
    });
};

module.exports = updateUserPermission;
