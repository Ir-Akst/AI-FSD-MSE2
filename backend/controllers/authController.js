const Student = require("../models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST /api/register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send("All fields required");
    }

    const exists = await Student.findOne({ email });
    if (exists) return res.status(400).send("Email already exists");

    const hashed = await bcrypt.hash(password, 10);

    const user = new Student({ name, email, password: hashed });
    await user.save();

    res.status(201).send("User Registered");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// POST /api/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Student.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).send("Invalid password");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};