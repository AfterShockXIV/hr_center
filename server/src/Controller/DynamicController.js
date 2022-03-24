/* eslint-disable no-undef */
const Dynamic_section = (req, res, next) => {

    db.query('SELECT * FROM hr_section', (err, result) => {
        if (err) {
          console.log(err);
        }else{
            res.send(result)
        }
    })

}
module.exports.Dynamic_section = Dynamic_section;


const Dynamic_departmet = (req, res, next) => {
    let {id_section} = req.params
    console.log(id_section)
    
    db.query(`SELECT * FROM hr_department inner join hr_section on (hr_department.id_section = hr_section.id_section) where hr_section.id_section = ${id_section}`, (err, result) => {
        if (err) {
          console.log(err);
        }else{
            res.send(result)
        }
    })

}
module.exports.Dynamic_departmet = Dynamic_departmet;