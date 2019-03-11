const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const uploadImageValidation = require('../../libs/uploadImageValidation');

const {
  updateUser,
} = require('../../models/db.js');

const updateUserAvatar = (req, res) => {
  try {
    const id = req.params.id;
    const form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    const upload = path.join('./dist', 'upload');

    if (!fs.existsSync(upload)) {
      fs.mkdirSync(upload);
    }
    form.uploadDir = path.join(process.cwd(), upload);
    form.parse(req, (err, fields, files) => {
      if (err) throw new Error('Ошибка парсинга изображения');
      const photoItem = files[Object.keys(files)[0]];

      const validationRes = uploadImageValidation(photoItem);

      if (validationRes.err) {
        fs.unlinkSync(files.photo.path);
        throw new Error(validationRes.status);
      }

      const fileName = path.join(upload, photoItem.name);
      fs.rename(photoItem.path, fileName, err => {
        if (err) throw err;

        const picPath = path.relative('./dist', fileName);


        updateUser(id, { image: picPath })
          .then(() => {
            res.json({ path: picPath });
          });
      });
    });

  } catch (e) {
    res.status(500);
    res.json({ status: false, msg: `Ошибка сервера: ${e.message}` });
  }
};

module.exports = updateUserAvatar;
