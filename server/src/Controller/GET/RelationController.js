/* eslint-disable no-undef */
const RelationData = (req, res, next) => {
  let { id_section } = req.params;
  console.log(id_section);

  db.query(
    `SELECT * FROM hr_position  LEFT JOIN project_hr on (project_hr.id_position = hr_position.id_position) where hr_position.id_section = ${id_section} and hr_position.id_department = '26' `,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        let hr_employeename = `${result[0].hr_employeename} ${result[0].hr_surname}`;
        if (result[0].hr_employeename === null) {
          hr_employeename = `ว่าง`;
        }
        let hr_employee_img = result[0].hr_employee_img;
        let MD_toLevel = result[0].toLevel;
        let MD_Text = result[0].thai_position;

        // let Name_po = res
        db.query(
          `SELECT * ,  hr_section.id_section as id  FROM hr_department inner join hr_section on (hr_department.id_section = hr_section.id_section) inner join hr_position on (hr_department.id_department = hr_position.id_department)  LEFT JOIN project_hr on (project_hr.id_position = hr_position.id_position) WHERE hr_section.id_section = ${id_section}`,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              //หา ID Department แยกสายงาน
              let IDdepartment = [];
              result.forEach((data) => {
                IDdepartment.push({
                  id: data.id_department,
                });
              });
              const IDdepartmentMAP = [
                ...new Set(IDdepartment.map(({ id }) => id)),
              ]; // ได้ค่าของ ID department

              let NodeData = [];
              IDdepartmentMAP.map(async (data) => {
                let Data_Com = result.filter((res) => {
                  return res.id_department === data;
                });
                NodeData.push(Data_Com);
              });

              let filter_depart = [
                {
                  id: MD_toLevel,
                  height: 100,
                  width: 300,
                  text: hr_employeename,
                  data: {
                    position: MD_Text,
                  },
                  icon: {
                    url: `http://localhost:5000/IMG_EMP/${hr_employee_img}`,
                    height: 60,
                    width: 60,
                    float: "left",
                  },
                },
              ]; // ได้ค่าของ ทั้งสองฝ่ายแล้ว

              let EdgesData = [];

             IDdepartmentMAP.forEach(async (res, key) => {
              await NodeData[key].forEach((data) => {
                  // console.log(data);
                  if (data.hr_employeename !== null) {
                    filter_depart.push({
                      id: data.toLevel,
                      height: 125,
                      width: 300,
                      text: `${data.hr_employeename} ${data.hr_surname}`,
                      textSize: "18px",
                      data: {
                        position: `${data.thai_position} `,
                      },
                      icon: {
                        url: `http://localhost:5000/IMG_EMP/${data.hr_employee_img}`,
                        height: 60,
                        width: 60,
                        float: "left",
                      },
                    });
                  } else {
                    filter_depart.push({
                      id: data.toLevel,
                      height: 125,
                      width: 300,
                      text: `ว่าง`,
                      data: {
                        position: `${data.thai_position} `,
                      },
                      // icon: {
                      //   url: "",
                      //   height: 60,
                      //   width: 50,
                      //   float: "left",
                      // },
                    });
                  }

                  EdgesData.push({
                    id: `${data.formLevel} to ${data.toLevel}`,
                    from: data.formLevel,
                    to: data.toLevel,
                  });
                });
              });
              ////====================
              //Next Step ส่วนของ Edges

              res.send({ EdgesData: EdgesData, NodeData: filter_depart });
              // console.log(`มีสายงานทั้งหมด : ${NodeData.length} สายงาน`);
            }
          }
        );
      }
    }
  );
};
module.exports.RelationData = RelationData;
