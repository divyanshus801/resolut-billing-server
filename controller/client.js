const Client = require("../models/client");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

//creating new client
exports.createNewClient = (req, res) => {
const { name } = req.body;
const _user = new Client({ name })
_user.save((err, client) => {
    if(err){
        return res.status(200).json({
            message: "unable to create new client",
            err
        })
    }
    if(client){
        return res.status(400).json({
            message: "client created successfully",
            client
        })
    }
})
}



//getting all clients data
exports.getAllClient = (req, res) => {
  Client.find().exec((err, clients) => {
    if (err) {
      return res.status(400).json({
        message: "error in fetching clients data",
        err,
      });
    }
    if (clients) {
      return res.status(200).json(clients);
    }
  });
};
