/* eslint-disable no-undef */
const RelationData = (req, res, next) => {
  let { id_section } = req.params;
  console.log(id_section);
  db.query(
    //`SELECT * FROM hr_position  LEFT JOIN project_hr on (project_hr.id_position = hr_position.id_position) where hr_position.id_section = ${id_section} and hr_position.id_department = '26' `,
    `SELECT * FROM hr_position  where hr_position.id_section = ${id_section} and hr_position.id_department = '26' `,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let hr_employeename = `${result[0].hr_employeename} ${result[0].hr_surname}`;
        // if (result[0].hr_employeename === null) {
        //   hr_employeename = `ว่าง`;
        // }
        // let hr_employee_img = result[0].hr_employee_img;
        let thai_position = result[0].thai_position;
        let MD_toLevel = result[0].toLevel;
        let MD_Text = result[0].thai_position;

        // let Name_po = res
        db.query(
          //`SELECT * , hr_section.id_section as id  FROM hr_department inner join hr_section on (hr_department.id_section = hr_section.id_section) inner join hr_position on (hr_department.id_department = hr_position.id_department)  LEFT JOIN project_hr on (project_hr.id_position = hr_position.id_position) WHERE  hr_section.id_section = ${id_section}`,
          `SELECT * , hr_section.id_section as id  FROM hr_department inner join hr_section on (hr_department.id_section = hr_section.id_section) inner join hr_position on (hr_department.id_department = hr_position.id_department)  WHERE  hr_section.id_section = ${id_section}`,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              //หา ID Department แยกสายงาน
              let db_2 = result
              db.query(
                //`SELECT * , hr_section.id_section as id  FROM hr_department inner join hr_section on (hr_department.id_section = hr_section.id_section) inner join hr_position on (hr_department.id_department = hr_position.id_department)  LEFT JOIN project_hr on (project_hr.id_position = hr_position.id_position) WHERE  hr_section.id_section = ${id_section}`,
                `SELECT * FROM project_hr  `,
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    let db_3 = result 
                    let IDdepartment = [];
                    db_2.forEach((data) => {
                      IDdepartment.push({
                        id: data.id_department,
                      });
                    });

                    const IDdepartmentMAP = [
                      ...new Set(IDdepartment.map(({ id }) => id)),
                    ]; // ได้ค่าของ ID department

                    let NodeData = [];

                    IDdepartmentMAP.map(async (data) => {
                      let Data_Com = db_2.filter((res) => {
                        return res.id_department === data;
                      });
                      NodeData.push(Data_Com);
                    });

                    let filter_depart = [
                      {
                        id: MD_toLevel,
                        height: 100,
                        width: 300,
                        test: thai_position,
                        data: [MD_Text],
                      },
                    ]; // ได้ค่าของ ทั้งสองฝ่ายแล้ว

                    let EdgesData = [];

                    // console.log(filter_depart)
                    IDdepartmentMAP.forEach(async (res, key) => {
                      await NodeData[key].forEach((data) => {
                        // console.log(data)
                
                        let memberFilter =  db_3.filter((data_f,key) => {
                         // console.log(data_f.id_position)
                          return data_f.id_position == data.id_position
                        })
                        
                        let memberArray = []

                        memberFilter.forEach(index => {
                          if(index.id_position == data.id_position){
                            console.log('มี')
                            memberArray.push(`${index.hr_employeename} ${index.hr_surname} รหัสพนักงาน ${index.hr_employeeid}`)
                          }else{
                            //memberArray.push(`ว่าง`)
                          }
                        });
                        console.log(memberArray)
                        
                        filter_depart.push({
                          id: data.toLevel,
                          height: 125,
                          width: 450,
                          // text: ,
                          data: [`${data.thai_position}`, memberArray],
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
                })
            }
          }
        );
      }
    }
  );
};
module.exports.RelationData = RelationData;
