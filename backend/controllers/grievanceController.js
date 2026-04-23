const Grievance = require("../models/Grievance");

// POST /api/grievances
exports.createGrievance = async (req, res) => {
  try {
    const grievance = new Grievance(req.body);
    await grievance.save();
    res.status(201).json(grievance);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET /api/grievances
exports.getAll = async (req, res) => {
  try {
    const data = await Grievance.find().sort({ date: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET /api/grievances/:id
exports.getById = async (req, res) => {
  try {
    const data = await Grievance.findById(req.params.id);
    if (!data) return res.status(404).send("Not found");
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// PUT /api/grievances/:id
exports.update = async (req, res) => {
  try {
    const updated = await Grievance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).send("Not found");
    res.json(updated);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// DELETE /api/grievances/:id
exports.deleteGrievance = async (req, res) => {
  try {
    const del = await Grievance.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).send("Not found");
    res.send("Deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET /api/grievances/search?title=xyz
exports.search = async (req, res) => {
  try {
    const { title = "" } = req.query;
    const result = await Grievance.find({
      title: { $regex: title, $options: "i" },
    });
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};