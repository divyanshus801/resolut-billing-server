const express = require('express');
const { adminMiddleware, requireSignin } = require('../common-middleware');
const { getUserById } = require('../controller/auth');
const { addWorkHour, getWorkHourByUserId } = require('../controller/workHour');
const router = express.Router();

//param route
router.param('userId',getUserById);

//read route
router.get('/workHour/getWorkHourByUserId/:userId', getWorkHourByUserId);

//post route
router.post('/workHour/createNew', addWorkHour);


// router.get('/testroute',isSignedIn,(req,res)=>{
// res.send("a protected route");
// });

module.exports = router;