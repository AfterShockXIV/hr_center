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

const ExportExcel = async (req, res, next) => {
  let { id_section } = req.params
  // console.log(id_section)
  const Excel = require("exceljs");
  async function exTest() {
    let Where_idsection = `and project_hr.id_section = '${id_section}' `;
    if (id_section === "All") {
      Where_idsection = "";
    }
    console.log(Where_idsection)
    let Select_All = `SELECT * FROM project_hr inner join hr_section on (project_hr.id_section = hr_section.id_section) inner join hr_department on (project_hr.id_department = hr_department.id_department)  inner join hr_position on (project_hr.id_position = hr_position.id_position) where project_hr.status_approve != '' ${Where_idsection} Order by project_hr.hr_run_id DESC `;
    db.query(Select_All, async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let dataEmp = result
        let name_section_f = ""
        let Where_section_dr = ""
        if (id_section === "All") {

        } else {
          if (dataEmp.length === 0) {
            Where_section_dr = ""
          } else {
            name_section_f = dataEmp[0].name_section
            Where_section_dr = `and hr_position.toLevel = 'Dr_${dataEmp[0].name_section}'`
          }
        }

        // console.log(Where_section_dr)
        let Select_Dr = `SELECT * FROM project_hr inner join hr_section on (project_hr.id_section = hr_section.id_section) inner join hr_department on (project_hr.id_department = hr_department.id_department)  inner join hr_position on (project_hr.id_position = hr_position.id_position) where project_hr.status_approve != '' ${Where_section_dr} Order by project_hr.hr_run_id DESC `
        db.query(Select_Dr, async (err, result) => {
          if (err) {
            console.log(err);
          } else {
            // console.log(dataEmp)
            // console.log(dataEmp.length)

            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet("My Sheet");
            worksheet.columns = [
              { header: "ลำดับ", key: "key", width: 5 },
              { header: "รหัสพนักงาน", key: "hr_employeeid", width: 20 },
              { header: "ชื่อ", key: "fname", width: 20 },
              { header: "นามสกุล", key: "lname", width: 20 },
              { header: "firstname", key: "fnameE", width: 20 },
              { header: "surname", key: "lnameE", width: 20 },
              { header: "สายงาน", key: "section", width: 50 },
              { header: "ฝ่าย", key: "department", width: 30 },
              { header: "ตำแหน่ง", key: "position", width: 30 },
              { header: "Email", key: "email", width: 20 },
              { header: "เบอร์โทร", key: "tel", width: 20 },
              { header: "เลขสแกนนิ้ว", key: "number_emp", width: 20 },
              { header: "วันเกิด", key: "birthday_emp", width: 20 },
              { header: "พนักงาน", key: "hr_emp", width: 20 },
              { header: "สถานะ", key: "status_emp", width: 20 },
            ]

            if (id_section === "All") {
              dataEmp.forEach((data, key) => {
                let objectEmp =
                  worksheet.addRow({
                    key: key + 1,
                    hr_employeeid: data.hr_employeeid,
                    fname: data.hr_employeename,
                    lname: data.hr_surname,
                    firstname: data.hr_employee_eng,
                    surname: data.hr_lastname_eng,
                    section: data.thai_section,
                    department: data.thai_department,
                    position: data.thai_position,
                    email: data.hr_email_user,
                    tel: data.hr_phone,
                    number_emp: data.number_emp,
                    birthday_emp: data.birthday_emp,
                    hr_emp: data.hr_emp,
                    status_emp: data.status_emp
                  })
              });
            } else {
              //ไม่มีชื่อ ผอ 
              if (result.length === 0 || result.length > 1) {
                dataEmp.forEach((data, key) => {
                  worksheet.addRow({
                    key: key + 1,
                    hr_employeeid: data.hr_employeeid,
                    fname: data.hr_employeename,
                    lname: data.hr_surname,
                    firstname: data.hr_employee_eng,
                    surname: data.hr_lastname_eng,
                    section: data.thai_section,
                    department: data.thai_department,
                    position: data.thai_position,
                    email: data.hr_email_user,
                    tel: data.hr_phone,
                    number_emp: data.number_emp,
                    birthday_emp: data.birthday_emp,
                    hr_emp: data.hr_emp,
                    status_emp: data.status_emp
                  })
                });
              } else {
                //มีชื่อ ผอ 
                worksheet.addRow({
                  key: 1,
                  hr_employeeid: result[0].hr_employeeid,
                  fname: result[0].hr_employeename,
                  lname: result[0].hr_surname,
                  firstname: result[0].hr_employee_eng,
                  surname: result[0].hr_lastname_eng,
                  section: result[0].thai_section,
                  department: result[0].thai_department,
                  position: result[0].thai_position,
                  email: result[0].hr_email_user,
                  tel: result[0].hr_phone,
                  number_emp: result[0].number_emp,
                  birthday_emp: result[0].birthday_emp,
                  hr_emp: result[0].hr_emp,
                  status_emp: result[0].status_emp
                })
                dataEmp.forEach((data, key) => {
                  worksheet.addRow({
                    key: key + 2,
                    hr_employeeid: data.hr_employeeid,
                    fname: data.hr_employeename,
                    lname: data.hr_surname,
                    firstname: data.hr_employee_eng,
                    surname: data.hr_lastname_eng,
                    section: data.thai_section,
                    department: data.thai_department,
                    position: data.thai_position,
                    email: data.hr_email_user,
                    tel: data.hr_phone,
                    number_emp: data.number_emp,
                    birthday_emp: data.birthday_emp,
                    hr_emp: data.hr_emp,
                    status_emp: data.status_emp
                  })
                });
              }

            }
            // const newWorkbook = new Excel.Workbook();
            await workbook.xlsx.writeFile(
              `./public/Excel/${id_section}.xlsx`
            );
            let file = `./public/Excel/${id_section}.xlsx`;
            res.download(file);
          }
        })
      }
    })

  }
  await exTest();

}
module.exports.ExportExcel = ExportExcel;