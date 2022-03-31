/* eslint-disable no-undef */
const RelationData = (req, res, next) => {
  let { id_section } = req.params;
  console.log(id_section);

  db.query(
    `SELECT * FROM hr_position where id_section = ${id_section} and id_department = '0' `,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let MD_toLevel = result[0].toLevel
        let MD_Text = result[0].thai_position
        db.query(
          `SELECT * ,  hr_section.id_section as id  FROM hr_department inner join hr_section on (hr_department.id_section = hr_section.id_section) inner join hr_position on (hr_department.id_department = hr_position.id_department) WHERE hr_section.id_section = ${id_section} `,
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
                  text: MD_Text,
                },
              ]; // ได้ค่าของ ทั้งสองฝ่ายแล้ว

              let EdgesData = [];

              IDdepartmentMAP.forEach((res, key) => {
                NodeData[key].forEach((data) => {
                  // console.log(data);
                  filter_depart.push({
                    id: data.toLevel,
                    text: `${data.thai_position}`,
                    data: { title: "1" },
                  });

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
