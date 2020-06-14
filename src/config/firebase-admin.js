import * as admin from "firebase-admin";
require("dotenv").config();

console.log("key:", process.env.PROJECT_ID);
var gclound_config = {
  project_id: process.env.PROJECT_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(gclound_config),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export default admin;
