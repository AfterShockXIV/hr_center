/* eslint-disable no-undef */
const AllEmp = (req, res, next) => {
  let { name_department, id_section } = req.params;

  let Where_idsection = `and project_hr.id_section = ${id_section} `;
  let Where_idsection_Hrm = `where project_hr.id_section = ${id_section}`;
  if (id_section === "All") {
    Where_idsection = "";
    Where_idsection_Hrm = "";
  }

  let Select_All = `SELECT * FROM project_hr inner join hr_section on (project_hr.id_section = hr_section.id_section) inner join hr_department on (project_hr.id_department = hr_department.id_department)  inner join hr_position on (project_hr.id_position = hr_position.id_position) where project_hr.status_approve = 'approve' ${Where_idsection} Order by project_hr.hr_run_id DESC `;
  if (name_department === '"HRM"') {
    Select_All = `SELECT * FROM project_hr inner join hr_section on (project_hr.id_section = hr_section.id_section) inner join hr_department on (project_hr.id_department = hr_department.id_department)  inner join hr_position on (project_hr.id_position = hr_position.id_position)  ${Where_idsection_Hrm} Order by project_hr.hr_run_id DESC`;
  }

  db.query(Select_All, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};
module.exports.AllEmp = AllEmp;

const AllEmpParams = (req, res, next) => {
  let { hr_run_id } = req.params;
  console.log(hr_run_id);
  console.log("1");
  db.query(
    `SELECT * , project_hr.id_section as id FROM project_hr  inner join hr_section on (project_hr.id_section = hr_section.id_section) inner join hr_department on (project_hr.id_department = hr_department.id_department)  inner join hr_position on (project_hr.id_position = hr_position.id_position) where project_hr.hr_run_id = ${hr_run_id} `,
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
