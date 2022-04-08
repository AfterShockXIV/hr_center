/* eslint-disable no-undef */
const xlsxFile = require("read-excel-file/node");

const Excel_read = async (req, res, next) => {
  await xlsxFile("./public/Excel/DED.xlsx").then((rows) => {
    console.table(rows[5]);
    let status_approve = "wait";
    console.table(rows);
    rows.forEach((data) => {
      db.query(
        `INSERT INTO project_hr(hr_employeeid,hr_employeename,hr_surname,hr_employee_eng,hr_lastname_eng,hr_nickname,hr_phone,id_section,id_department,id_position,hr_job_start,hr_email_user,hr_password,hr_employee_img,hr_emp,number_emp,status_emp,job_out,birthday_emp,status_approve) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          data[0],
          data[1],
          data[2],
          data[3],
          data[4],
          data[5],
          data[6],
          data[7],
          data[8],
          data[9],
          data[10],
          data[11],
          data[12],
          data[13],
          data[14],
          data[15],
          data[16],
          data[17],
          data[18],
          status_approve,
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

          }
        }
    );
    });
  });

  await res.send({
    status: "ok",
    message: "เพิ่มข้อมูลสำเร็จ",
    // hr_run_id : result.insertId
  });
  res.end();
};
module.exports.Excel_read = Excel_read;
