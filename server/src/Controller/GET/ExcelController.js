// hr_employeeid,
// hr_employeename,
// hr_surname,
// hr_employee_eng,
// hr_lastname_eng,
// hr_nickname,
// hr_phone,
// id_section,
// id_department,
// id_position,
// hr_job_start,
// hr_email_user,
// hr_password,
// hr_employee_img,
// hr_emp,
// number_emp,
// status_emp,
// job_out,
// birthday_emp,
// status_approve
/* eslint-disable no-undef */
const xlsxFile = require("read-excel-file/node");

const Excel_read = async (req, res, next) => {
  // async function INSERT_Data() {
  //   await xlsxFile("./public/Excel/OSM.xlsx").then((rows) => {
  //     console.table(rows[1]);
  //     let status_approve = "wait";
  //     let hr_emp = "รายเดือน";
  //     let job_out = "-";
  //     rows.forEach(async (data) => {
  //       let job_start = `-`;
  //       let hbd = `-`;
  //       if (data[10] instanceof Date) {
  //         let dd_job = new Date(data[10]).toISOString().slice(0, 10);
  //         job_start = `${dd_job}`;
  //       } else {
  //         let dd_job = data[10].slice(0, 2);
  //         let mm_job = data[10].slice(3, 5);
  //         let yy_job = data[10].slice(6, 10);
  //         job_start = `${yy_job}-${mm_job}-${dd_job}`;
  //       }
  //       if (data[18] instanceof Date) {
  //         let dd_bd = new Date(data[18]).toISOString().slice(0, 10);
  //         hbd = `${dd_bd}`;
  //       } else {
  //         let dd_bd = data[18].slice(0, 2);
  //         let mm_bd = data[18].slice(3, 5);
  //         let yy_bd = data[18].slice(6, 10);
  //         hbd = `${yy_bd}-${mm_bd}-${dd_bd}`;
  //       }
  //       // console.log(hbd);
  //       // console.log(job_start);
  //       // console.log("============");
  //       await db.query(
  //         `INSERT INTO project_hr(hr_employeeid,hr_employeename,hr_surname,hr_employee_eng,hr_lastname_eng,hr_nickname,hr_phone,id_section,id_department,id_position,hr_job_start,hr_email_user,hr_password,hr_employee_img,hr_emp,number_emp,status_emp,job_out,birthday_emp,status_approve) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
  //         [
  //           data[0],
  //           data[1],
  //           data[2],
  //           data[3],
  //           data[4],
  //           data[5],
  //           data[6],
  //           data[7],
  //           data[8],
  //           data[9],
  //           job_start,
  //           data[11],
  //           data[12],
  //           data[13],
  //           hr_emp,
  //           data[15],
  //           data[16],
  //           job_out,
  //           hbd,
  //           status_approve,
  //         ],
  //         (err, result) => {
  //           if (err) {
  //             console.log(err);
  //             res.send({
  //               message: "เพิ่มข้อมูลไม่สำเร็จ",
  //             });
  //           } else {
  //           }
  //         }
  //       );
  //     });
  //   });
  // }
  // await INSERT_Data()
  // await res.send({
  //   status: "ok",
  //   message: "เพิ่มข้อมูลสำเร็จ",
  //   // hr_run_id : result.insertId
  // });
  // await console.log("Success")
  // await res.end();
};
module.exports.Excel_read = Excel_read;
