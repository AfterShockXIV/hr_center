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
//===============================================================
const AddPositionController = require('../Controller/GET/AddPositionController')
router.post('/apis/post_position/add_position',AddPositionController.Add_position)
//===============================================================
const GetAllSectionController = require('../Controller/GET/GetAllSectionController')
router.get('/apis/get/AllSection',GetAllSectionController.GetAllSection)
router.get('/apis/get/AllSection/:id_section/:id_department/:id_position',GetAllSectionController.GetAllParams)
//===============================================================
const Position_edit = require('../Controller/POST/PositionEdit')
router.post('/apis/post/position_edit',Position_edit.Position_edit)
//===============================================================
const FormHrAdd = require('../Controller/POST/FormHrAdd')
router.post('/apis/post/post_form_hr',FormHrAdd.FormHrAdd)
router.post('/apis/post/update_img_emp',FormHrAdd.FormHrIMG)
//===============================================================
const AllEmp = require('../Controller/GET/AllEmpController')
router.get('/apis/get/allemp',AllEmp.AllEmp)
router.get('/apis/get/allemp/:hr_run_id',AllEmp.AllEmpParams)

module.exports = router;