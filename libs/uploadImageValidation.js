const validation = (file) => {
  if (file.name === '' || file.size === 0) {
    return { status: 'Не загружена картинка!', err: true };
  }
  return { status: 'Ok', err: false };
};

module.exports = validation;
