const express = require("express");
const router = express.Router();

const AddController = require('../Controller/AddController')
router.post('/postApi/web_data/add_data',AddController.Add_data)


//===============================================================
const DynamicController = require('../Controller/DynamicController')
router.get('/apis/dynamic/dynamic_section',DynamicController.Dynamic_section)
router.get('/apis/dynamic/dynamic_departmet/:id_section',DynamicController.Dynamic_departmet)

//===============================================================
const AddPositionController = require('../Controller/AddPositionController')
router.post('/apis/post_position/add_position',AddPositionController.Add_position)

module.exports = router;