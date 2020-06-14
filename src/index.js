import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import config_cors from "./config/cors-config";

// import db from './config/db';
import router from "./routers/comic.router";

dotenv.config();

const port = process.env.API_PORT;

const app = express();
// db.connect('next', 'localhost', '27017');
app.use(cors(config_cors));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});
app.use("/", router);

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
