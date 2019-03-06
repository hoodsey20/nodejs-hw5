
const post = (req, res) => {
  console.log('login');
  res.json({
    access_token: "access_token",
    firstName: "firstName",
    id: "1",
    image: "",
    middleName: "middleName",
    password: "password",
    permission: {
      chat: {
        C: true,
        D: true,
        R: true,
        U: true
      },
      news: {
        C: true,
        D: true,
        R: true,
        U: true
      },
      setting: {
        C: true,
        D: true,
        R: true,
        U: true
      }
    },
    permissionId: "permissionId",
    surName: "surName",
    username: "username",
  });
};

module.exports = {
  post
};
