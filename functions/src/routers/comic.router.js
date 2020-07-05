const express = require("express");
const comicsController = require("../controllers/comic.controller");
// const handle = require("express-async-handler");
const router = express.Router();

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

module.exports = { router };
