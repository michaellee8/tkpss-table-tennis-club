import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import firebase from "firebase";

const styles = theme => ({
  root: {
    //  marginTop: theme.spacing.unit * 3,
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
class ButtonAppBar extends React.Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={this.props.classes.menuButton}
              color="contrast"
              aria-label="Menu"
              onClick={this.props.onExpandClick}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              type="title"
              color="inherit"
              className={this.props.classes.flex}
            >
              Table Tennis
            </Typography>
            {!firebase.auth().currentUser ? (
              <Button
                color="contrast"
                onClick={() => {
                  firebase
                    .auth()
                    .signInWithRedirect(
                      new firebase.auth.FacebookAuthProvider()
                    );
                }}
              >
                Login
              </Button>
            ) : (
              <Button
                color="contrast"
                onClick={() => {
                  firebase.auth().signOut();
                }}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(ButtonAppBar);
