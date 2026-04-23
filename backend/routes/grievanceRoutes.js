const express = require("express");
const router = express.Router();

const {
  createGrievance,
  getAll,
  getById,
  update,
  deleteGrievance,
  search,
} = require("../controllers/grievanceController");

const protect = require("../middleware/authMiddleware");

// Order matters: /search before /:id
router.get("/search", protect, search);

router.post("/", protect, createGrievance);
router.get("/", protect, getAll);
router.get("/:id", protect, getById);
router.put("/:id", protect, update);
router.delete("/:id", protect, deleteGrievance);

module.exports = router;