/* eslint-disable no-undef */
const fs = require("fs");
const FormHrIMG = (req, res, next) => {
  if (!req.files) {
    console.log("No image");
    res.redirect("/");
  } else {
    let file = req.files.file;
    let filetype = file.mimetype.split("/")[1];
    let { hr_employeeid } = req.body;
    let filename = `IMGEMP_${hr_employeeid}.${filetype}`;
    let path = "./public/IMG_EMP/";
    console.log(filename);

    file.mv(`${path}${filename}`, (err) => {
      if (err) {
        res.status(500);
      }
      res.send(req.files);
    });

    let update_main =
      "UPDATE  project_hr set hr_employee_img = '" +
      filename +
      "' where hr_employeeid = '" +
      hr_employeeid +
      "' ";
    db.query(update_main, (err, result) => {
      if (err) {
        console.log(err);
        res.redirect("/");
      }
    });
  }
};

module.exports.FormHrIMG = FormHrIMG;

const FormHrEditIMG = (req, res, next) => {
  if (!req.files) {
    console.log("No image");
    res.redirect("/");
  } else {
    let file = req.files.file;
    let filetype = file.mimetype.split("/")[1];
    let { hr_run_id, OlefileName } = req.body;
    let filename = `IMGEMP_${hr_run_id}.${filetype}`;

    let path = "./public/IMG_EMP/";
    console.log(hr_run_id);
    console.log(`รูปเก่า ${OlefileName}`);
    fs.unlink(`${OlefileName}`, (err) => {
      if (err) {
      }
    });
    file.mv(`${path}${filename}`, (err) => {
      if (err) {
        res.status(500);
      }
      res.send(req.files);
    });

    let update_main =
      "UPDATE  project_hr set hr_employee_img = '" +
      filename +
      "' where  hr_run_id = '" +
      hr_run_id +
      "' ";
    db.query(update_main, (err, result) => {
      if (err) {
        console.log(err);
        res.redirect("/");
      }
    });
  }
};

module.exports.FormHrEditIMG = FormHrEditIMG;
