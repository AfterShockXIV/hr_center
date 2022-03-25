/* eslint-disable no-undef */
const Add_data = (req, res, next) => {
  let {
    web_name,
    web_topup,
    web_bonus,
    web_count_day,
    web_bonus_two,
    web_count_day_two,
    web_turn,
  } = req.body;

  db.query(
    "SELECT * FROM web_data where web_name = '" + web_name + "'",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        res.send({
          message: "เพิ่มข้อมูลไม่สำเร็จ มีข้อมูลนี้แล้ว",
        });
      } else {
        db.query(
          `INSERT INTO web_data(web_name,web_topup,web_bonus,web_count_day,web_bonus_two,web_count_day_two,web_turn) VALUES (?,?,?,?,?,?,?)`,
          [
            web_name,
            web_topup,
            web_bonus,
            web_count_day,
            web_bonus_two,
            web_count_day_two,
            web_turn,
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
      }
    }
  );
};

module.exports.Add_data = Add_data;

