import React from "react";
import Dialog, { DialogTitle, DialogActions } from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import firebase from "firebase";

export default class extends React.Component {
  props: {
    onClose: Function,
    user: any,
    userId: string,
    open: boolean
  };
  constructor(props) {
    super(props);
    this.state = {
      editedUserData: {
        displayName: props.user.displayName,
        joinYear: props.user.joinYear,
        permission: props.user.permission,
        photoUrl: props.user.photoUrl,
        remark: props.user.remark,
        score: props.user.score,
        stones: props.user.stones,
        level: props.user.level,
        info: props.user.info,
        stats: props.user.stats
      }
    };
  }
  handleCancel = () => this.props.onClose();
  handleConfirm = () =>
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.userId)
      .set(this.state.editedUserData, { merge: true })
      .then(() => this.props.onClose())
      .catch(err => {
        console.log(err);
        alert("User data changed failed");
      });
  render() {
    return (
      <Dialog open={this.props.open}>
        <DialogTitle>{"Editing " + this.props.user.displayName}</DialogTitle>
        {Object.keys(this.state.editedUserData).map(
          key =>
            typeof this.props.user[key] === "object" ? (
              Object.keys(this.state.editedUserData[key]).map(innerKey => (
                <TextField
                  label={key + "." + innerKey}
                  placeholder={this.props.user[key][innerKey].toString()}
                  value={this.state.editedUserData[key][innerKey]}
                  onChange={event =>
                    this.setState(prevState => ({
                      editedUserData: {
                        ...prevState.editedUserData,
                        [key]: {
                          ...prevState.editedUserData[key],
                          [innerKey]: event.target.value
                        }
                      }
                    }))}
                />
              ))
            ) : (
              <TextField
                label={key}
                placeholder={this.props.user[key].toString()}
                value={this.state.editedUserData[key]}
                onChange={event =>
                  this.setState(prevState => ({
                    editedUserData: {
                      ...prevState.editedUserData,
                      [key]: event.target.value
                    }
                  }))}
              />
            )
        )}
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
