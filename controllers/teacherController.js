//importing student model
const Student = require('../models/student');

// Sample teacher credentials (for demonstration purposes)
const correctTeacherId = 'fc2023';
const correctPassword = 'pswd';

const teacher_login_get = (req, res) => {
    res.render("teacher/teacherLogin", { error: null });
};

const teacher_login_post = (req, res) => {

    const enteredTeacherId = req.body.teacherId;
    const enteredPassword = req.body.password;

    //******** Teacher Login **********//
    if (enteredTeacherId === correctTeacherId && enteredPassword === correctPassword) {
        // Successful login
        res.redirect("/teacher/option");
    }
    else {
        // Incorrect teacher ID or password
        res.render("teacher/teacherLogin", {
            error: 'Incorrect Teacher ID or Password'
        });
    }
};

const teacher_viewall_get = async (req, res) => {
    const allStudents = await Student.find().sort({ roll: 1 })
    res.render("teacher/viewall", { student: allStudents, formatDate: formatDate })
};

const teacher_edit_get = async (req, res) => {
    const user = await Student.findById(req.params.id);
    const dateOfBirth = user.dob.toISOString().split('T')[0];
    res.render("teacher/edit", { user: user, formattedDateOfBirth: dateOfBirth });
};
const teacher_edit_post = async (req, res) => {
    const user = await Student.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/teacher/viewall")
};
const teacher_delete_get = async (req, res) => {
    await Student.findByIdAndDelete(req.params.id)
    res.redirect("/teacher/viewall")
};
const teacher_option_get = (req, res) => {
    res.render("teacher/option")
};
const teacher_add_get = (req, res) => {
    res.render("teacher/addstudent");
};
const teacher_add_post = async (req, res) => {
    const singleStudent = new Student({
        name: req.body.name,
        roll: req.body.roll,
        dob: req.body.dob,
        score: req.body.score
    })
    try {
        const newStudent = await singleStudent.save();
        res.redirect("/teacher/add");
    } catch {
        res.send("error, roll no already exist")
    }
};

function formatDate(date) {
    // const options = { year: 'numeric', month: 'short', day: 'numeric' };
    // return date.toLocaleDateString('en-US', options);
    const dateObject = new Date(date);
    const formattedDate = `${dateObject.getUTCDate()}-${dateObject.getUTCMonth() + 1}-${dateObject.getUTCFullYear()}`;
    return formattedDate
}

//exporting teacher controller functions
module.exports = {
    teacher_login_get,
    teacher_login_post,
    teacher_viewall_get,
    teacher_edit_get,
    teacher_edit_post,
    teacher_delete_get,
    teacher_add_post,
    teacher_add_get,
    teacher_option_get
}