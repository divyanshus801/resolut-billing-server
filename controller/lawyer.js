const Lawyer = require("../models/lawyers");


//creating new client
exports.createNewLawyer = (req, res) => {
    const { name } = req.body;
    const _user = new Lawyer({ name })
    _user.save((err, lawyer) => {
        if(err){
            return res.status(400).json({
                message: "unable to create new client",
                err
            })
        }
        if(lawyer){
            return res.status(201).json({
                message: "client created successfully",
                lawyer
            })
        }
    })
    }

    exports.getAllLawyer = (req, res) => {
        Lawyer.find()
        .exec((err, lawyers) => {
          if (err) {
            return res.status(400).json({
              error: "No matters are in database",
            });
          }
          if(lawyers){
           return res.status(201).json(lawyers);
          }
        });
      };