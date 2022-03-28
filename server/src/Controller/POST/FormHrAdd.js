/* eslint-disable no-undef */

const FormHrAdd = (req, res, next) => {
  let {
    hr_employeeid,
    hr_employeename,
    hr_surname,
    hr_employee_eng,
    hr_lastname_eng,
    hr_nickname,
    hr_phone,
    hr_job_start,
    hr_email_user,
    hr_password,
    hr_employee_img,
    hr_emp,
    id_section,
    id_department,
    id_position,
    number_emp,
    birthday_emp,
  } = req.body;
  let status_emp = "ทำงานอยู่";
  let status_approve = "wait";
  db.query(
    `INSERT INTO project_hr(status_approve,status_emp,hr_employeeid,hr_employeename,hr_surname,hr_employee_eng,hr_lastname_eng,hr_nickname,hr_phone,hr_job_start,hr_email_user,hr_password,hr_employee_img,hr_emp,id_section,id_department,id_position,number_emp,birthday_emp) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      status_approve,
      status_emp,
      hr_employeeid,
      hr_employeename,
      hr_surname,
      hr_employee_eng,
      hr_lastname_eng,
      hr_nickname,
      hr_phone,
      hr_job_start,
      hr_email_user,
      hr_password,
      hr_employee_img,
      hr_emp,
      id_section,
      id_department,
      id_position,
      number_emp,
      birthday_emp,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: "เพิ่มข้อมูลไม่สำเร็จ",
        });
      } else {
        console.log(result);
        console.log("INSERT SUCCESS !!!");
        res.send({
          status: "ok",
          message: "เพิ่มข้อมูลสำเร็จ",
          hr_run_id : result.insertId
        });
      }
    }
  );
};

module.exports.FormHrAdd = FormHrAdd;


