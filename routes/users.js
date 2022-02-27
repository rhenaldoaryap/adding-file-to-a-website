const express = require("express");
const multer = require("multer");

// storing the file with original name and keep the extensions of the file.
const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storageConfig });
const router = express.Router();

router.get("/", function (req, res) {
  res.render("profiles");
});

router.get("/new-user", function (req, res) {
  res.render("new-user");
});

// the order of the routes, multer and function matters
// upload.single need the name of the input file, look what name attribute you used at the input element that hold the file you want to upload
router.post("/profiles", upload.single("image"), function (req, res) {
  // get access to the file will be upload
  const uploadedImageFile = req.file;
  const userData = req.body;

  console.log(uploadedImageFile);
  console.log(userData);

  res.redirect("/");
});

module.exports = router;
