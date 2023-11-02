//importing student model
const Student = require('../models/student');

const student_login_get = (req, res) => {
  res.render("student/login", { error: null });
};

const student_login_post = async (req, res) => {

  const Sturoll = req.body.roll;
  const Studob = req.body.dob;
  const individualStudent = await Student.findOne({
    roll: Sturoll,
    dob: Studob
  });
  if (!individualStudent) {
    res.render("student/login", {
      error: "Check Roll Number and Date of Birth Again"
    })
  }
  res.render("student/view", { one: individualStudent, formatDate: formatDate });
};

function formatDate(date) {
  // const options = { year: 'numeric', month: 'short', day: 'numeric' };
  // return date.toLocaleDateString('en-US', options);
  const dateObject = new Date(date);
  const formattedDate = `${dateObject.getUTCDate()}-${dateObject.getUTCMonth() + 1}-${dateObject.getUTCFullYear()}`;
  return formattedDate
}

//exporting student controller functions
module.exports = {
  student_login_get,
  student_login_post
}