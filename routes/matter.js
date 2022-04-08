const express = require('express');
const { adminMiddleware, requireSignin } = require('../common-middleware');
const { createMatterByClient, getClientById, getMatterByClientId, getMatterById, pdf } = require('../controller/matter');
const router = express.Router();

//all of param routes
router.param("matterId",getMatterById);
router.param("clientId",getClientById);

//read route
// router.get('/matter/getMatter/:clientId',requireSignin,adminMiddleware, getAllClient);
router.get('/matter/:clientId',getMatterByClientId);
router.get('/matter/pdf/:matterId',pdf);

//post route
router.post('/matter/createNew',requireSignin,adminMiddleware, createMatterByClient);

module.exports = router;