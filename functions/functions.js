const functions = require("firebase-functions");
const admin = require("./src/config/firebase-admin");
const express = require("express");
const helmet = require("helmet");
const dotenv = require("dotenv");
const cors = require("cors");

const { requests } = require("./src/config/cors-config");

const { router } = require("./src/routers/comic.router");

dotenv.config();

const port = process.env.API_PORT;

const app = express();

app.use(cors(requests));
app.use(express.json());
app.use(helmet());

app.get("/", (req, res) => {
  console.log("Bem vindo: ", req.body);
  res.status(200).send("Bem vindo a API, da Next_Comics! ;-)");
});
app.use(router);

app.listen(port, () => {
  console.log(`Server is running at localhost:${port}`);
});

process.on("beforeExit", (code) => {
  // Can make asynchronous calls
  setTimeout(() => {
    console.log(`Process will exit with code: ${code}`);
    process.exit(code);
  }, 100);
});

process.on("exit", (code) => {
  // Only synchronous calls
  console.log(`Process exited with code: ${code}`);
});

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

const next_api_functions = functions.https.onCall(app);

module.exports = {
  next_api_functions,
};
