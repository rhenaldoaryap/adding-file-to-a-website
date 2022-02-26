const express = require("express");
const multer = require("multer");

// storing the file to specific folder we target to
const upload = multer({});
const router = express.Router();

router.get("/", function (req, res) {
  res.render("profiles");
});

router.get("/new-user", function (req, res) {
  res.render("new-user");
});

// the order of the target link, multer and function matters
// upload.single need the name of the input file, look what name attribute you use at the input element that hold the file you want to upload
router.post("/profiles", upload.single("image"), function (req, res) {
  // get access to the file will be upload
  const uploadedImageFile = req.file;
  const userData = req.body;
});

module.exports = router;
