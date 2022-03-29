/* eslint-disable no-undef */
const GetAllSection = (req, res, next) => {
    db.query(`SELECT * ,  hr_section.id_section as id  FROM hr_department inner join hr_section on (hr_department.id_section = hr_section.id_section) inner join hr_position on (hr_department.id_department = hr_position.id_department) `, (err, result) => {
        if (err) {
          console.log(err);
        }else{
            res.send(result)
        }
    })
}
module.exports.GetAllSection = GetAllSection;


const GetAllParams = (req, res, next) => {
    let {id_section , id_department , id_position} = req.params

    db.query(`SELECT * FROM hr_department inner join hr_section on (hr_department.id_section = hr_section.id_section) inner join hr_position on (hr_department.id_department = hr_position.id_department) where hr_section.id_section = ${id_section} and hr_department.id_department = ${id_department} and hr_position.id_position = ${id_position}
    `, (err, result) => {
        if (err) {
          console.log(err);
        }else{
            res.send(result[0])
        }
    })

}
module.exports.GetAllParams = GetAllParams;