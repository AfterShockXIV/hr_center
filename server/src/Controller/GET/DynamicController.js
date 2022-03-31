/* eslint-disable no-undef */
const Dynamic_section = (req, res, next) => {
  db.query("SELECT * FROM hr_section", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};
module.exports.Dynamic_section = Dynamic_section;

const Dynamic_departmet = (req, res, next) => {
  let { id_section } = req.params;
  console.log(id_section);

  db.query(
    `SELECT * FROM hr_department inner join hr_section on (hr_department.id_section = hr_section.id_section) where hr_section.id_section = ${id_section}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};
module.exports.Dynamic_departmet = Dynamic_departmet;

const Dynamic_position = (req, res, next) => {
  let { id_department } = req.params;
  db.query(
    `SELECT * FROM hr_position inner join hr_department on (hr_department.id_department = hr_position.id_department) where hr_department.id_department = ${id_department}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};
module.exports.Dynamic_position = Dynamic_position;

const Dynamic_supervisor = (req, res, next) => {
  let { id_department } = req.params;
  db.query(
    `SELECT * FROM hr_position  where id_department = ${id_department} and PositionLevel = 'Sup' `,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
          console.log(`จำนวน Sup : ${result.length} คน`)
        res.send({supdata:result,supcount:result.length});
      }
    }
  );
};
module.exports.Dynamic_supervisor = Dynamic_supervisor;
