const express = require("express");
const multer = require("multer");

// get access to the database
const db = require("../data/database");

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

router.get("/", async function (req, res) {
  // get access to database and fetching all of data inside of it in ARRAY to be able work with it
  const users = await db.getDb().collection("users").find().toArray();
  res.render("profiles", { users: users });
});

router.get("/new-user", function (req, res) {
  res.render("new-user");
});

// the order of the routes, multer and function matters
// upload.single need the name of the input file, look what name attribute you used at the input element that hold the file you want to upload
router.post("/profiles", upload.single("image"), async function (req, res) {
  // get access to the file will be upload
  const uploadedImageFile = req.file;
  const userData = req.body;

  // get access to the database and configuring what file that should be stored in database
  await db.getDb().collection("users").insertOne({
    name: userData.username,
    // not storing the image to database, but storing the path
    imagePath: uploadedImageFile.path,
  });

  res.redirect("/");
});

module.exports = router;
