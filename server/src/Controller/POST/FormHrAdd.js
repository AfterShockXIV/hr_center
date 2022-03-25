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
        });
      }
    }
  );
};

module.exports.FormHrAdd = FormHrAdd;

const FormHrIMG = (req, res, next) => {
  if (!req.files) {
    console.log("No image");
    res.redirect("/");
  } else {
    let file = req.files.file;
    let filetype = file.mimetype.split("/")[1];
    let { hr_employeeid } = req.body;
    let filename = `IMGEMP_${hr_employeeid}.${filetype}`;
    let path = "./public/IMG_EMP/";
    console.log(filename);

    file.mv(`${path}${filename}`, (err) => {
      if (err) {
        res.status(500);
      }
      res.send(req.files);
    });

    let update_main =
      "UPDATE  project_hr set hr_employee_img = '" +
      filename +
      "' where hr_employeeid = '" +
      hr_employeeid +
      "' ";
    db.query(update_main, (err, result) => {
      if (err) {
        console.log(err);
        res.redirect("/");
      }
    });
  }
};

module.exports.FormHrIMG = FormHrIMG;
