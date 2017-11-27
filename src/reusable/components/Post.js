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
import TextField from "material-ui/TextField";
import SendIcon from "material-ui-icons/Send";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comment: "", expand: false };
  }
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
          <Typography component="p">
            <Linkify>{this.props.post.content}</Linkify>
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            onClick={() =>
              this.setState(prevState => ({
                expand: !prevState.expand
              }))}
          >
            <ExpandMoreIcon />
          </IconButton>
          <div
            style={{
              flex: "1 1 auto"
            }}
          />
          {this.props.isAdmin ? (
            <IconButton onClick={() => this.props.actionHandler("delete")}>
              <DeleteIcon />
            </IconButton>
          ) : null}
        </CardActions>
        <Collapse
          in={this.state.expand}
          transitionDuration="auto"
          unmountOnExit
        >
          <div>
            <TextField
              style={{ width: "70%" }}
              label="Comment"
              placeholder="Comment"
              value={this.state.comment}
              onChange={event => this.setState({ comment: event.target.value })}
            />
            <IconButton
              onClick={() => {
                this.props.actionHandler("comment", this.state.comment);
                this.setState({ comment: "" });
              }}
            >
              <SendIcon />
            </IconButton>
          </div>
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
                      console.log(comment.id);
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
