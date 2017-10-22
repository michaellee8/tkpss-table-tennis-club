import React from "react";
import User from "../reusable/components/User";
import firebase from "firebase";
import { LinearProgress } from "material-ui/Progress";
import Button from "material-ui/Button";
import EditIcon from "material-ui-icons/ModeEdit";
import UserEditor from "./User-edit";

export default class UserId extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: "loading", user: null, openEditor: false }; // success, error, not-found, loading
  }
  componentDidMount() {
    this.fetchUser();
  }
  fetchUser() {
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.match.params.id)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({ status: "success", user: doc.data() });
        } else {
          this.setState({ status: "not-found" });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ status: "error" });
      });
  }
  render() {
    if (this.state.status === "loading") {
      return (
        <div>
          <LinearProgress />
        </div>
      );
    } else if (this.state.status === "not-found") {
      return <div>User not found</div>;
    } else if (this.state.status === "error") {
      return <div>Error</div>;
    } else if (this.state.status === "success" && this.state.user) {
      return (
        <div>
          <User
            user={this.state.user}
            showAllData={
              (typeof window.currentUserPermissionLevel === "number" &&
                window.currentUserPermissionLevel > 0) ||
              (firebase.auth().currentUser &&
                this.props.match.params.id === firebase.auth().currentUser.uid)
            }
          />
          {window.currentUserPermissionLevel ? (
            <Button
              fab
              color="primary"
              aria-label="change"
              style={{
                margin: 0,
                top: "auto",
                right: 40,
                bottom: 40,
                left: "auto",
                position: "fixed"
              }}
              onClick={() => this.setState({ openEditor: true })}
            >
              <EditIcon />
            </Button>
          ) : null}

          <UserEditor
            open={this.state.openEditor}
            onClose={() =>
              this.setState({ openEditor: false }, () => this.fetchUser())}
            userId={this.props.match.params.id}
            user={this.state.user}
          />
        </div>
      );
    }
    return <div>Unknown Error</div>;
  }
}
