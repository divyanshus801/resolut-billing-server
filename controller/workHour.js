const WorkHours = require("../models/workHours");

exports.addWorkHour = (req, res) => {
  console.log(req.body);
  const workHour = new WorkHours(req.body);
  workHour.save((err, workHour) => {
    if (err) {
      return res.status(400).json({ err, error: "unable to add new time" });
    }
    if (workHour) {
      return res.status(201).json({ workHour });
    }
  });
};

exports.getWorkHourByUserId = (req, res) => {
  WorkHours.find({ user: req.user._id })
    .populate("user", "_id fullName email ")
    .populate("matter")
    .exec((error, workHours) => {
      if (error) return res.status(400).json({ error });
      if (workHours) {
        res.status(200).json({ workHours });
      }
    });
};


