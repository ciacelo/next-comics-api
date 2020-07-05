const admin = require("firebase-admin");
require("dotenv").config();
const gclound_config = require("../../next-commics-firebase-adminsdk.json");

// console.log("key:", process.env.PROJECT_ID);
// var gclound_config = {
//   projectId: process.env.GCLOUD_PROJECT_ID,
//   private_key: process.env.GCLOUD_PRIVATE_KEY.replace(/\\n/g, "\n"),
//   client_email: process.env.GCLOUD_CLIENT_EMAIL,
// };

admin.initializeApp({
  credential: admin.credential.cert(gclound_config),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

module.exports = {
  admin,
};
