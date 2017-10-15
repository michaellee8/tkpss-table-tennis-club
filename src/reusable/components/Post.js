import React from "react";
import type { Post } from "../types/Post";
import type { User } from "../types/User";
import Avatar from "material-ui/Avatar";
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
} from "material-ui/Card";
import Collapse from "material-ui/transitions/Collapse";
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar
} from "material-ui/List";
import { IntlProvider, FormattedRelative } from "react-intl";
import { GridList, GridListTile } from "material-ui/GridList";
import Typography from "material-ui/Typography";
import Linkify from "react-linkify";
import Comment from "./Comment";
import DeleteIcon from "material-ui-icons/Delete";
import IconButton from "material-ui/IconButton";

export default class extends React.Component {
  props: {
    post: Post,
    author: User,
    comments: Array<{ content: string, author: User, id: string }>,
    isAdmin: boolean,
    actionHandler: (type: string, payload: any) => undefined
  };
  render() {
    return (
      <Card style={{ width: "100%" }}>
        <CardHeader
          onClick={() =>
            this.props.actionHandler("navToUser", this.props.author.id)}
          avatar={
            this.props.author.photoUrl ? (
              <Avatar src={this.props.author.photoUrl} />
            ) : (
              <Avatar>{this.props.author.displayName.charAt(0)}</Avatar>
            )
          }
          title={this.props.author.displayName}
          subheader={
            <FormattedRelative value={this.props.post.createTime * 1000} />
          }
        />
        <CardContent>
          <Typography component="p">{this.props.post.content}</Typography>
        </CardContent>
        <CardActions>
          <div
            style={{
              flex: "1 1 auto"
            }}
          />
          <IconButton onClick={() => this.props.actionHandler("delete")}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <Collapse>
          <List>
            {this.props.comments.map(comment => (
              <Comment
                key={comment.id}
                user={comment.author}
                isAdmin={this.props.isAdmin}
                content={comment.content}
                interactionHandler={(type: string) => {
                  switch (type) {
                    case "delete":
                      this.props.actionHandler("deleteComment", comment.id);
                      break;
                    case "navToWriter":
                      this.props.actionHandler("navToUser", comment.authorId);
                      break;
                    default:
                  }
                }}
              />
            ))}
          </List>
        </Collapse>
      </Card>
    );
  }
}
