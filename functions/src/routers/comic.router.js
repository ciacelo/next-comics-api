const express = require("express");
const comicsController = require("../controllers/comic.controller");
const multer = require("multer");
// const handle = require("express-async-handler");
const router = express.Router();
const upload = multer();

router
  .route("/comic")
  .get(comicsController.findAll)
  .post(comicsController.save);

router
  .route("/comic/:id")
  .get(comicsController.findById)
  .put(comicsController.replace)
  .patch(comicsController.update)
  .delete(comicsController.delete);

router
  .route("/comic/image")
  .post(upload.single('file'), comicsController.saveImage);

module.exports = { router };
