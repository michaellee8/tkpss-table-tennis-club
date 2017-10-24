const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.createNewUser = functions.auth.user().onCreate(event => {
  var newUser = {
    createTime: Math.floor(Date.now() / 1000),
    displayName: event.data.displayName,
    email: event.data.email,
    joinYear: new Date().getFullYear(),
    lastLoginTime: null,
    permission: 0,
    photoUrl: event.data.photoURL,
    remark: "",
    score: 55,
    stones: 0,
    level: 0,
    info: {
      name: "New user",
      class: "7E",
      classNo: 0
    },
    stats: {
      atk: 50,
      cot: 50,
      def: 50,
      hp: 50,
      int: 50,
      spe: 50
    }
  };
  console.log(newUser);
  return admin
    .firestore()
    .collection("users")
    .doc(event.data.uid)
    .set(newUser);
});
