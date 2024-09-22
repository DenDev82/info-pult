const admin = require("firebase-admin");
var serviceAccount = require("./info-pult-firebase-adminsdk-g1gca-7c196513bc.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://info-pult-default-rtdb.europe-west1.firebasedatabase.app",
});

// Set admin privileges on the user corresponding to the email
admin
  .auth()
  .getUserByEmail("adminssc@gmail.com")
  .then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, { isAdmin: true });
  })
  .then(() => {
    console.log("Admin privileges granted to user");
  })
  .catch((error) => {
    console.error("Error setting custom claims:", error);
  });
