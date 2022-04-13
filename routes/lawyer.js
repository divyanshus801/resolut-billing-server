const express = require('express');
const { createNewLawyer, getAllLawyer } = require('../controller/lawyer');
const router = express.Router();


// //read route
router.get('/lawyer/getAllLawyer', getAllLawyer);

//post route
router.post('/Lawyer/createNew', createNewLawyer);

module.exports = router;