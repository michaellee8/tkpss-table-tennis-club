import React from "react";
import User from "../reusable/components/User";
import firebase from "firebase";
import { LinearProgress } from "material-ui/Progress";

export default class UserId extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: "loading", user: null }; // success, error, not-found, loading
  }
  componentDidMount() {
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
      return <User user={this.state.user} />;
    }
    return <div>Unknown Error</div>;
  }
}
