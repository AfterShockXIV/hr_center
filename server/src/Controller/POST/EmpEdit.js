/* eslint-disable no-undef */
const Emp_edit = (req, res, next) => {
  let {
    hr_run_id,
    hr_employeeid,
    number_emp,
    hr_job_start,
    hr_employeename,
    hr_surname,
    hr_employee_eng,
    hr_lastname_eng,
    hr_nickname,
    birthday_emp,
    hr_phone,
    id_section,
    id_department,
    id_position,
    hr_emp,
    hr_email_user,
    status_emp,
    hr_password,
    job_out,
  } = req.body;
 
  let position_edit =
    "UPDATE project_hr SET hr_employeeid = '" +
    hr_employeeid +
    "' , number_emp = '" +
    number_emp +
    "' , hr_job_start = '" +
    hr_job_start +
    "' , hr_employeename = '" +
    hr_employeename +
    "' , hr_surname = '" +
    hr_surname +
    "' , hr_employee_eng = '" +
    hr_employee_eng +
    "' , hr_lastname_eng = '" +
    hr_lastname_eng +
    "' , hr_nickname = '" +
    hr_nickname +
    "' , birthday_emp = '" +
    birthday_emp +
    "' , hr_phone = '" +
    hr_phone +
    "' , id_section = '" +
    id_section +
    "' , id_department = '" +
    id_department +
    "' , id_position = '" +
    id_position +
    "' , hr_emp = '" +
    hr_emp +
    "' , hr_email_user = '" +
    hr_email_user +
    "' , status_emp = '" +
    status_emp +
    "' , hr_password = '" +
    hr_password +
    "' , job_out = '" +
    job_out +
    "' WHERE hr_run_id = '" +
    hr_run_id +
    "' ";
  db.query(position_edit, (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        message: "แก้ไขข้อมูลไม่สำเร็จ",
      });
    } else {
      res.send({
        status: "success",
        message: "แก้ไขข้อมูลสำเร็จ",
      });
    }
  });
};
module.exports.Emp_edit = Emp_edit;


const Emp_approve = (req, res, next) => {
    let {hr_run_id} = req.body
    let position_edit =
    "UPDATE project_hr SET status_approve = 'approve'  WHERE hr_run_id = '" +hr_run_id + "' ";
    db.query(position_edit, (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: "ยืนยันข้อมูลไม่สำเร็จ",
        });
      } else {
        res.send({
          status: "success",
          message: "ยืนยันข้อมูลสำเร็จ",
        });
      }
    });
  };
  module.exports.Emp_approve = Emp_approve;