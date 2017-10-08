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
        <div>
          <ButtonAppBar
            onExpandClick={() => this.setState({ expand: !this.state.expand })}
          />
          <AppDrawer
            expand={this.state.expand}
            handleClose={() => this.setState({ expand: false })}
          />
          <Route
            path="/users/:id"
            component={({ match }) => (
              <Async
                promise={firebase
                  .firestore()
                  .collection("users")
                  .doc(match.params.id)
                  .get()}
                then={doc => {
                  if (doc.exists) {
                    return <User user={doc.data()} />;
                  } else {
                    return <div>User not found!</div>;
                  }
                }}
                catch={err => {
                  alert("error: " + err);
                  return <div>Error</div>;
                }}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
