/* eslint-disable no-undef */
const Position_edit = (req, res, next) => {
 
  let { eng_position, th_position, id_position } = req.body;
  console.log(eng_position, th_position, id_position);
  let position_edit = `UPDATE hr_position SET thai_position = '${th_position}' , eng_position = '${eng_position}' WHERE id_position = ${id_position} `;
  db.query(position_edit,(err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: "เพิ่มข้อมูลไม่สำเร็จ",
        });
      } else {
        res.send({
            status: "success",
            message: "แก้ไขข้อมูลสำเร็จ",
          });
      }})
};
module.exports.Position_edit = Position_edit;
