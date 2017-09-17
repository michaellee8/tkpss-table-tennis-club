/* @flow */
import React from "react";
import type { User } from "../types/User";
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";
import ClearIcon from "material-ui-icons/Clear";
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar
} from "material-ui/List";
import Avatar from "material-ui/Avatar";
import Checkbox from "material-ui/Checkbox";

type Props = {
  usage: "view" | "single-click",
  users: Array<User>,
  selectedUserId: null | string,
  onSelect: (id: string) => void,
  showSearchBar: boolean, // The searchbar logic should be implemented with server-side code
  onSearch: (searchText: string) => void
};

type State = {
  currentSearchText: string
};

export default class UserSelector extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { currentSearchText: "" };
  }
  handleSearchChange = (event: SyntheticInputEvent<*>) => {
    this.setState({ currentSearchText: event.target.value });
    this.props.onSearch(event.target.value);
  };
  render() {
    return (
      <div>
        {this.props.showSearchBar ? (
          <div>
            <TextField
              label="Search"
              type="search"
              value={this.state.currentSearchText}
              fullWidth
              margin="normal"
              onChange={this.handleSearchChange}
            />
          </div>
        ) : null}
        <List>
          {this.props.users.map(user => (
            <ListItem
              dense
              button
              key={user.id}
              onClick={() => this.props.onSelect(user.id)}
            >
              <ListItemAvatar>
                {user.photoUrl ? (
                  <Avatar src={user.photoUrl} />
                ) : (
                  <Avatar>{user.displayName.charAt(0)}</Avatar>
                )}
              </ListItemAvatar>
              <ListItemText
                primary={user.displayName}
                secondary={"@" + user.searchName}
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}
