const xlsxFile = require("read-excel-file/node");

const Excel_read = (req, res, next) => {
  xlsxFile("./public/Excel/DED.xlsx").then((rows) => {
    console.table(rows[1]);
    // console.table(rows);
  });
};
module.exports.Excel_read = Excel_read;
