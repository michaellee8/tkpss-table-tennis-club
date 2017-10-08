import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "typeface-roboto";
import firebase from "firebase";

var config = {
  apiKey: "AIzaSyBz7tiiKQ521ks-V4mpJB5tEFVJLtack_4",
  authDomain: "tkpss-table-tennis-club.firebaseapp.com",
  databaseURL: "https://tkpss-table-tennis-club.firebaseio.com",
  projectId: "tkpss-table-tennis-club",
  storageBucket: "tkpss-table-tennis-club.appspot.com",
  messagingSenderId: "314338850168"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
