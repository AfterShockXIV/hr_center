/* eslint-disable no-undef */
const Add_position = (req, res, next) => {
  let { id_section, id_department, thai_position, eng_position } = req.body;

    db.query(
      `INSERT INTO hr_position(id_section,id_department, thai_position, eng_position) VALUES (?,?,?,?)`,
      [
        id_section,id_department, thai_position, eng_position
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
          res.send({
            status: "ok",
            message: "เพิ่มข้อมูลสำเร็จ",
          });
        }
      }
    );
};

module.exports.Add_position = Add_position;
