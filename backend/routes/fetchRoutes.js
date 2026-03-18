const express = require("express");
const {
  fetchWebsite,
  getHistory,
  clearHistory,
} = require("../controllers/fetchController");

const router = express.Router();

router.post("/fetch", fetchWebsite);
router.get("/history", getHistory);
router.delete("/history", clearHistory);

module.exports = router;