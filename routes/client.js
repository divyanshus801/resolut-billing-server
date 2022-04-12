const express = require('express');
const { adminMiddleware, requireSignin } = require('../common-middleware');
const { createNewClient, getAllClient } = require('../controller/client');
const router = express.Router();

//read route
router.get('/client/getAllClient', getAllClient);

//post route
router.post('/client/createNew', createNewClient);


// router.get('/testroute',isSignedIn,(req,res)=>{
// res.send("a protected route");
// });

module.exports = router;