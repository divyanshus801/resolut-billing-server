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
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "problem with pdf",
      });
    }
    //Destructure the fields
    const { name, pricePerHour, client } = fields;

    let _matter = new Matter(fields);

    //handle file here
    if (files.engagementLetter) {
      if (files.engagementLetter.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!",
        });
      }
      _matter.engagementLetter.data = fs.readFileSync(
        files.engagementLetter.filepath
      );
      _matter.engagementLetter.contentType = files.engagementLetter.type;
    }
    //save to the DB
    _matter.save((err, matter) => {
      if (err) {
        return res.status(400).json({
          error: "New matter creation in DB failed",
        });
      }
      res.status(201).json(matter);
    });
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
    if(matters){
     return res.status(201).json(matters);
    }
  });
};

//middleware
exports.pdf = (req, res, next) => {
  if (req.matter.engagementLetter.data) {
    res.set("Content-Type", reqmatter.engagementLetter.contentType);
    return res.send(req.matter.engagementLetter.data);
  }
  next();
};
