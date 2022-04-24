const Matter = require("../models/matter");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const client = require("../models/client");

exports.getMatterById = (req, res, next, id) => {
  Matter.findById(id)
    .populate("client")
    .exec((err, matter) => {
      if (err) {
        return res.status(400).json({
          error: "matter not found in DB",
        });
      }
      req.matter = matter;
      next();
    });
};

exports.getMatterByMatterId = (req, res) => {
if(req.matter){
  return res.status(200).json({ matterDetails: req.matter })
}
}

exports.getClientById = (req, res, next, id) => {
  client.findById(id).exec((err, client) => {
    if (err) {
      return res.status(400).json({
        error: "client not found in DB",
      });
    }
    req.client = client;
    next();
  });
};

exports.createMatterByClient = (req, res) => {
  console.log(req.body);
  const { name, client, pricePerHour, resourceSpecificPrice } = req.body;
  let = engagementLetter = [];

  if (req.file) {
    console.log(req.file)
    engagementLetter = 
     { data: req.file.path,
      contentType: req.file.mimetype}
  }

  let matter = new Matter({
    name,
    client,
    engagementLetter,
  });

  if(pricePerHour !== ""){
    matter.pricePerHour = pricePerHour;
  }else{
    matter.resourceSpecificPrice = resourceSpecificPrice;
  }

  //save to the DB
  console.log(
    matter.name,
    matter.client,
    matter.pricePerHour,
    matter.resourceSpecificPrice,
  );
  matter.save((error, matter) => {
    if (error) return res.status(400).json( error );
    if (matter) {
      res.status(201).json( matter );
    }
  });
};

exports.getMatterByClientId = (req, res) => {
  let client = req.client;
  Matter.find({ client: client }).exec((err, matters) => {
    if (err) {
      return res.status(400).json({
        error: "No matters Found for this client",
      });
    }
    res.status(201).json(matters);
  });
};

exports.getAllMatter = (req, res) => {
  Matter.find()
    .populate("client")
    .exec((err, matters) => {
      if (err) {
        return res.status(400).json({
          error: "No matters are in database",
        });
      }
      if (matters) {
        return res.status(201).json(matters);
      }
    });
};

//middleware
exports.pdf = (req, res, next) => {
  if (req.matter.engagementLetter.data) {
    var data = fs.readFileSync(req.matter.engagementLetter.data)
    res.set("Content-Type", req.matter.engagementLetter.contentType);
    return res.send(data);
  }
  next();
};
