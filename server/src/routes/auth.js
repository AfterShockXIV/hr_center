const express = require("express");
const router = express.Router();
//==============================================================
const AddController = require('../Controller/GET/AddController')
router.post('/postApi/web_data/add_data',AddController.Add_data)
//===============================================================
const DynamicController = require('../Controller/GET/DynamicController')
router.get('/apis/dynamic/dynamic_section',DynamicController.Dynamic_section)
router.get('/apis/dynamic/dynamic_departmet/:id_section',DynamicController.Dynamic_departmet)
router.get('/apis/dynamic/dynamic_position/:id_department',DynamicController.Dynamic_position)
router.get('/apis/dynamic/dynamic_supervisor/:id_department',DynamicController.Dynamic_supervisor)
//===============================================================
const AddPositionController = require('../Controller/GET/AddPositionController')
router.post('/apis/post_position/add_position',AddPositionController.Add_position)
//===============================================================
const GetAllSectionController = require('../Controller/GET/GetAllSectionController')
router.get('/apis/get/AllSection',GetAllSectionController.GetAllSection)
router.get('/apis/get/AllSection/:id_section/:id_department/:id_position',GetAllSectionController.GetAllParams)
router.get('/apis/get/All_SectionParams/:id_section',GetAllSectionController.GetAllSectionParams)
//===============================================================
const Position_edit = require('../Controller/POST/PositionEdit')
router.post('/apis/post/position_edit',Position_edit.Position_edit)
//===============================================================
const FormHrAdd = require('../Controller/POST/FormHrAdd')
router.post('/apis/post/post_form_hr',FormHrAdd.FormHrAdd)
//===============================================================
const FormHrIMG = require('../Controller/POST/FormHrIMG')
router.post('/apis/post/update_img_emp',FormHrIMG.FormHrIMG)
router.post('/apis/post/update_img_emp_edit',FormHrIMG.FormHrEditIMG)
//===============================================================
const AllEmp = require('../Controller/GET/AllEmpController')
router.get('/apis/get/allemp/:name_department/:id_section',AllEmp.AllEmp)
router.get('/apis/get/allempedit/:hr_run_id',AllEmp.AllEmpParams)
//===============================================================
const EmpEdit = require('../Controller/POST/EmpEdit')
router.post('/apis/post/emp_edit',EmpEdit.Emp_edit)
router.post('/apis/post/approve_emp',EmpEdit.Emp_approve)

const RelationData = require('../Controller/GET/RelationController')
router.get('/apis/get/RelationData/:id_section',RelationData.RelationData)

module.exports = router;