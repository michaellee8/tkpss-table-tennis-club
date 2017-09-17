import React from "react";
import type { User } from "../types/User";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import { withStyles } from "material-ui/styles";
import classnames from "classnames";
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
} from "material-ui/Card";
import Collapse from "material-ui/transitions/Collapse";
import Typography from "material-ui/Typography";
import red from "material-ui/colors/red";
import FavoriteIcon from "material-ui-icons/Favorite";
import ShareIcon from "material-ui-icons/Share";
import DeleteIcon from "material-ui-icons/Delete";
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar
} from "material-ui/List";
import Linkify from "react-linkify";

class Comment extends React.Component {
  props: {
    user: User,
    interactionHandler: (type: string) => undefined,
    isAdmin: boolean,
    content: string
  };
  state: {
    expanded: boolean
  };
  constructor(props: Props) {
    super(props);
    this.state = { expanded: false };
  }
  render() {
    return (
      <ListItem dense>
        <ListItemAvatar
          onClick={() => this.props.interactionHandler("navToWriter")}
        >
          {this.props.user.photoUrl ? (
            <Avatar src={this.props.user.photoUrl} />
          ) : (
            <Avatar>{this.props.user.displayName.charAt(0)}</Avatar>
          )}
        </ListItemAvatar>
        <ListItemText
          primary={
            <a onClick={() => this.props.interactionHandler("navToWriter")}>
              {this.props.user.displayName}
            </a>
          }
          secondary={<Linkify>{this.props.content}</Linkify>}
        />
        {this.props.isAdmin ? (
          <ListItemSecondaryAction>
            <IconButton
              onClick={() => this.props.interactionHandler("delete")}
              aria-label="Delete"
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        ) : null}
      </ListItem>
    );
  }
}

export default Comment;
