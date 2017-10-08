import React, { Component } from "react";
import Drawer from "material-ui/Drawer";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import { withRouter } from "react-router";

export default withRouter(function(props) {
  return (
    <Drawer open={props.expand} onRequestClose={() => props.handleClose()}>
      <List>
        <ListItem button onClick={() => props.history.push("/admin-posts")}>
          <ListItemText primary="Admin Posts" />
        </ListItem>
        <ListItem button onClick={() => props.history.push("/users")}>
          <ListItemText primary="Users" />
        </ListItem>
      </List>
    </Drawer>
  );
});
