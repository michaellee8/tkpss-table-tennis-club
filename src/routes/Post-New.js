import React from "react";
import Dialog, { DialogTitle, DialogActions } from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import firebase from "firebase";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: "", title: "New Post" };
  }
  handleCancel = () => this.props.onClose();
  handleConfirm = () =>
    firebase
      .firestore()
      .collection("adminPosts")
      .add({
        content: this.state.content,
        createTime: Math.floor(Date.now() / 1000),
        authorId: firebase.auth().currentUser.uid,
        author: firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
      })
      .then(() => this.props.onClose())
      .catch(err => {
        console.log(err);
        this.setState({ title: "Create post fail, please try again" });
      });
  render() {
    return (
      <Dialog fullScreen open={this.props.open}>
        <DialogTitle>{this.state.title}</DialogTitle>
        <TextField
          label="Content"
          placeholder="Content"
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
