const db = require("./db.json");
const router = require("express").Router();
const FLAGS = {
  INPUT_FAILED: "1",
  EMAIL_FAILED: "2",
  SUCCESS: "4",
};
router.post("", (req, res) => {
  console.log(db.users);
  const credentials = req.body;
  const result = validate(credentials);
  console.log(result);
  if (result === FLAGS.SUCCESS) {
    const usersFiltered = db.users.filter(
      (x) =>
        x.email === credentials.email && x.password === credentials.password
    );
    console.log(usersFiltered);
    res.send({
      message:
        usersFiltered.length > 0
          ? "Authentication Success"
          : "Authentication Failed",
      loginInUser: usersFiltered,
    });
  } else
    res.send({
      message: "Authentication Failed due to invalid credentials.",
    });
});
function validate(data) {
  let emailRegex = new RegExp(
    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
  );
  let regexResult = emailRegex.test(data.email);
  if (regexResult === false) {
    return FLAGS.EMAIL_FAILED;
  } else if (data.password) return FLAGS.SUCCESS;
  else return FLAGS.INPUT_FAILED;
}
module.exports = router;
