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

const Add_play_date = (req, res, next) => {
  let { web_run_id, login_id, play_date, username_web, password_web } = req.body;

  db.query(
    `SELECT *   FROM play_data where web_run_id = ${web_run_id} and  login_id = ${login_id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(`${result[0].play_date} เพิ่ม 2 วัน ${result[0].day}`)
        if (result.length > 0) {
          res.send({
            message: "เพิ่มข้อมูลไม่สำเร็จ มีข้อมูลนี้แล้ว",
          });
        } else {
          db.query(
            `INSERT INTO play_data(play_date , web_run_id , login_id , username_web, password_web) VALUES (?,?,?,?,?)`,
            [play_date, web_run_id, login_id , username_web, password_web],
            (err, result) => {
              if (err) {
                console.log(err);
                res.send({
                  message: "เพิ่มข้อมูลไม่สำเร็จ",
                });
              } else {
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
    }
  );
};

module.exports.Add_play_date = Add_play_date;
