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

export default class extends React.Component {
  props: {
    post: Post,
    author: User,
    // comments: Array<{ content: string, user: User }>,
    isAdmin: boolean,
    actionHandler: (type: string, payload: any) => undefined
  };
  render() {
    return (
      <Card>
        {/* <CardHeader
          avatar={
            this.props.author.photoUrl ? (
              <Avatar src={this.props.author.photoUrl} />
            ) : (
              <Avatar>{this.props.author.displayName.charAt(0)}</Avatar>
            )
          }
          title={this.props.user.displayName}
          subheader={<FormattedRelative value={this.props.post.createTime} />}
        /> */}
        <CardContent>
          <Typography component="p">{this.props.post.content}</Typography>
        </CardContent>
        {/* <Collapse>
          <List>
            {this.props.comments.map(comment => (
              <Comment
                user={comment.user}
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
        </Collapse> */}
      </Card>
    );
  }
}
