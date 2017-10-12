import React, { Component } from "react";
import logo from "./logo.svg";
import ButtonAppBar from "./ButtonAppBar";

import firebase from "firebase";
import User from "./reusable/components/User";
import "firebase/firestore";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AppDrawer from "./AppDrawer";
import Async from "react-promise";
import UserId from "./routes/User-Id";
import UsersList from "./routes/Users-List";
import Posts from "./routes/Posts";
import { IntlProvider } from "react-intl";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: "100%"
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

class App extends Component {
  componentWillMount() {
    this.authObserver = firebase.auth().onAuthStateChanged(() => {
      if (firebase.auth().currentUser) {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .get()
          .then(doc => {
            window.currentUserPermissionLevel = doc.data().permission;
            this.forceUpdate();
          })
          .catch(err => console.log(err));
      } else {
        window.currentUserPermissionLevel = null;
        this.forceUpdate();
      }
    });
  }
  componentWillUnmount() {
    this.authObserver();
  }
  state: {
    expand: boolean
  };
  constructor(props) {
    super(props);
    this.state = { expand: false };
  }
  render() {
    return (
      <Router>
        <IntlProvider locale="en">
          <div>
            <ButtonAppBar
              onExpandClick={() =>
                this.setState({ expand: !this.state.expand })}
            />
            <AppDrawer
              expand={this.state.expand}
              handleClose={() => this.setState({ expand: false })}
            />
            <Route exact path="/users" component={UsersList} />
            <Route exact path="/admin-posts" component={Posts} />
            <Route exact path="/" component={Posts} />
            <Route path="/users/:id" component={UserId} />
          </div>
        </IntlProvider>
      </Router>
    );
  }
}

export default App;
