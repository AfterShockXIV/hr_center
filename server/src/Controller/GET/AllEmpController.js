/* eslint-disable no-undef */
const AllEmp = (req, res, next) => {
  db.query(
    `SELECT * FROM project_hr  inner join hr_section on (project_hr.id_section = hr_section.id_section) inner join hr_department on (project_hr.id_department = hr_department.id_department)  inner join hr_position on (project_hr.id_position = hr_position.id_position) `,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};
module.exports.AllEmp = AllEmp;


const AllEmpParams = (req, res, next) => {
  let {hr_run_id} = req.params 
  console.log(hr_run_id)
  db.query(
    `SELECT * FROM project_hr  inner join hr_section on (project_hr.id_section = hr_section.id_section) inner join hr_department on (project_hr.id_department = hr_department.id_department)  inner join hr_position on (project_hr.id_position = hr_position.id_position) where hr_run_id = ${hr_run_id} `,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result[0]);
      }
    }
  );
};
module.exports.AllEmpParams = AllEmpParams;