const db = require("./db.json");
const router = require("express").Router();
const FLAGS = {
  ALREADY_REGISTERED: "0",
  INPUT_FAILED: "1",
  EMAIL_FAILED: "2",
  PASSWORD_FAILED: "3",
  SUCCESS: "4",
};
// input:
// name (required/valid email),
// password required (lower/upper case)
// email required, regex
router.post("", (req, res) => {
  const result = validate(req.body);
  if (result === FLAGS.ALREADY_REGISTERED) {
    res.send({
      status: 200,
      message: "User Already Registered",
      createdUser: req.body,
    });
  } else if (result === FLAGS.SUCCESS) {
    db.users.push(req.body);
    res.send({
      status: 200,
      message: "Registration Successfull",
      createdUser: req.body,
    });
  } else if (result === FLAGS.EMAIL_FAILED) {
    res.send({
      status: 400,
      message: "Invalid Email Format.",
    });
  } else if (result === FLAGS.PASSWORD_FAILED) {
    res.send({
      status: 400,
      message:
        "Password format failed. atleast 1 upper & lower and special character and length must be atleast 8 characters long.",
    });
  } else if (result === FLAGS.INPUT_FAILED) {
    res.send({
      status: 400,
      message: "Invalid request data.",
    });
  }
});
function validate(data) {
  let emailRegex = new RegExp(
    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
  );
  let passwordRegex = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
  );
  let regexResult = emailRegex.test(data.email);
  let passwordRegexResult = passwordRegex.test(data.password);
  if (regexResult === false) {
    if (db.users.filter((x) => x.email === data.email).length > 0) {
      return FLAGS.ALREADY_REGISTERED;
    } else {
      return FLAGS.EMAIL_FAILED;
    }
  } else if (passwordRegexResult === false) {
    return FLAGS.PASSWORD_FAILED;
  } else if (data.name.length > 0) return FLAGS.SUCCESS;
  else return FLAGS.INPUT_FAILED;
}
module.exports = router;
