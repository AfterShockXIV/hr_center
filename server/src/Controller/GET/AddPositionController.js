/* eslint-disable no-undef */
const Add_position = (req, res, next) => {
  let {
    id_section,
    id_department,
    thai_position,
    eng_position,
    cat_emp,
    id_supervisor,
    hr_supervisorCount,
  } = req.body;

  if (cat_emp === "Mg" || cat_emp === "Ass" || cat_emp === "Sup") {
    id_supervisor = 0;
  }
  db.query(
    `SELECT hr_section.name_section ,  hr_position.PositionLevel , hr_position.id_department , hr_position.id_position  FROM hr_department inner join hr_section on (hr_department.id_section = hr_section.id_section) inner join hr_position on (hr_department.id_department = hr_position.id_department) where hr_position.id_department = ${id_department} `,
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: "เพิ่มข้อมูลไม่สำเร็จ",
        });
      } else {
        console.log(result.length);
        const DATA_ALL = result;
        if (DATA_ALL.length > 0) {
          const name_section = result[0].name_section;
          db.query(
            `INSERT INTO hr_position(id_section,id_department, thai_position, eng_position , PositionLevel , id_supervisor) VALUES (?,?,?,?,?,?)`,
            [
              id_section,
              id_department,
              thai_position,
              eng_position,
              cat_emp,
              id_supervisor,
            ],
            (err, result) => {
              if (err) {
                console.log(err);
                res.send({
                  message: "เพิ่มข้อมูลไม่สำเร็จ",
                });
              } else {
                const id_position = result.insertId;
                console.log("INSERT SUCCESS !!!");

                let Mg_filter = DATA_ALL.filter((data) => {
                  return data.PositionLevel === "Mg";
                });

                let Ass_filter = DATA_ALL.filter((data) => {
                  return data.PositionLevel === "Ass";
                });

                if (cat_emp === "Mg") {
                  console.log(
                    `toLevel MG : ${cat_emp}_${id_department}_${id_position}`
                  );
                } else if (cat_emp === "Ass") {
                  console.log(
                    `toLevel Ass : ${cat_emp}_${id_department}_${id_position}`
                  );
                } else if (cat_emp === "Sup") {
                  console.log(
                    `toLevel Sup : ${cat_emp}_${id_department}_${id_position}`
                  );
                }
                let toLevel = "";
                let formLevel = "";
                if (cat_emp === "Emp") {
                  toLevel = `${cat_emp}_${id_position}`;
                  formLevel = `Sup_${id_department}_${id_supervisor}`;
                } else if (cat_emp === "Ass") {
                  toLevel = `${cat_emp}_${id_department}_${id_position}`;
                  formLevel = `Mg_${id_department}_${Mg_filter[0].id_position}`;
                } else if (cat_emp === "Mg") {
                  toLevel = `${cat_emp}_${id_department}_${id_position}`;
                  formLevel = `Dr_${name_section}`;
                } else if (cat_emp === "Sup") {
                  toLevel = `${cat_emp}_${id_department}_${id_position}`;
                  formLevel = `Ass_${id_department}_${Ass_filter[0].id_position}`;
                }

                
                let Update_toLevel =
                  "UPDATE hr_position SET toLevel = '" +
                  toLevel +
                  "' , formLevel = '" +
                  formLevel +
                  "' WHERE id_position = '" +
                  id_position +
                  "'";

                db.query(Update_toLevel, (err, result) => {
                  if (err) {
                    console.log(err);
                    res.send({
                      message: "เพิ่มข้อมูลไม่สำเร็จ",
                    });
                  } else {
                    res.send({
                      status: "ok",
                      message: "เพิ่มข้อมูลสำเร็จ",
                      id_section: id_section,
                      id_department: id_department,
                      id_position: id_position,
                    });
                  }
                });
              }
            }
          );
        } else {
          if (cat_emp === "Mg") {
            db.query(
              `SELECT hr_section.name_section  FROM hr_department inner join hr_section on (hr_department.id_section = hr_section.id_section)  where hr_department.id_department = ${id_department} `,
              (err, result) => {
                if (err) {
                  console.log(err);
                  res.send({
                    message: "เพิ่มข้อมูลไม่สำเร็จ",
                  });
                } else {
                  console.log(result);
                  const name_section = result[0].name_section;
                  db.query(
                    `INSERT INTO hr_position(id_section,id_department, thai_position, eng_position , PositionLevel , id_supervisor) VALUES (?,?,?,?,?,?)`,
                    [
                      id_section,
                      id_department,
                      thai_position,
                      eng_position,
                      cat_emp,
                      id_supervisor,
                    ],
                    (err, result) => {
                      if (err) {
                        console.log(err);
                        res.send({
                          message: "เพิ่มข้อมูลไม่สำเร็จ",
                        });
                      } else {
                        const id_position = result.insertId;
                        if (cat_emp === "Mg") {
                          console.log(
                            `toLevel MG : ${cat_emp}_${id_department}_${id_position}`
                          );
                        }

                        let toLevel = `${cat_emp}_${id_department}_${id_position}`;
                        let formLevel = `Dr_${name_section}`;

                        let Update_toLevel =
                          "UPDATE hr_position SET toLevel = '" +
                          toLevel +
                          "' , formLevel = '" +
                          formLevel +
                          "' WHERE id_position = '" +
                          id_position +
                          "'";

                        db.query(Update_toLevel, (err, result) => {
                          if (err) {
                            console.log(err);
                            res.send({
                              message: "เพิ่มข้อมูลไม่สำเร็จ",
                            });
                          } else {
                            res.send({
                              status: "ok",
                              message: "เพิ่มข้อมูลสำเร็จ",
                              id_section: id_section,
                              id_department: id_department,
                              id_position: id_position,
                            });
                          }
                        });
                        console.log(formLevel);
                      }
                    }
                  );
                }
              }
            );
          } else {
            res.send({
              message: "เพิ่มข้อมูลไม่สำเร็จ กรุณาเพิ่ม ผู้จัดการก่อน",
            });
          }
        }
      }
    }
  );
};

module.exports.Add_position = Add_position;
