import React from "react";
import UserSelector from "../reusable/components/UserSelector";
import { withRouter } from "react-router";
import firebase from "firebase";

class UsersListInternal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [], searchText: null };
  }
  componentDidMount() {
    this.search();
  }
  search = () => {
    if (
      this.state.searchText &&
      parseInt(this.state.searchText) &&
      parseInt(this.state.searchText) > 2000 &&
      parseInt(this.state.searchText) < 10000
    ) {
      firebase
        .firestore()
        .collection("users")
        .where("joinYear", "==", parseInt(this.state.searchText))
        .get()
        .then(querySnapshot => {
          var users = [];
          querySnapshot.forEach(doc => {
            var obj = doc.data();
            obj.id = doc.id;
            users.push(obj);
          });
          this.setState({ users });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      firebase
        .firestore()
        .collection("users")
        .get()
        .then(querySnapshot => {
          var users = [];
          querySnapshot.forEach(doc => {
            var obj = doc.data();
            obj.id = doc.id;
            users.push(obj);
          });
          this.setState({ users });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  render() {
    return (
      <UserSelector
        usage="single-click"
        users={this.state.users}
        selectedUserId={null}
        showSearchBar={true}
        onSearch={searchText => {
          this.setState({ searchText }, () => this.search());
        }}
        onSelect={id => this.props.history.push("/users/" + id)}
      />
    );
  }
}

export default withRouter(UsersListInternal);
