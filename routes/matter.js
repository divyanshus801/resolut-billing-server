const express = require('express');
const { adminMiddleware, requireSignin, routeHitted } = require('../common-middleware');
const { createMatterByClient, getClientById, getMatterByClientId, getMatterById, pdf, getAllMatter, getMatterByMatterId } = require('../controller/matter');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null,shortid.generate() + '-' + file.originalname)
    }
  })

  const upload = multer({storage});

//all of param routes
router.param("matterId",getMatterById);
router.param("clientId",getClientById);

//read route
router.get('/matter/getAllMatter', getAllMatter);
// router.get('/matter/getMatter/:clientId',requireSignin,adminMiddleware, getAllClient);
router.get('/matter/:clientId',getMatterByClientId);
router.get('/matter/getMatterByMatterId/:matterId', getMatterByMatterId);
router.get('/matter/pdf/:matterId',pdf);


//post route
router.post('/matter/createNew',upload.single('engagementLetter'), createMatterByClient);

module.exports = router;