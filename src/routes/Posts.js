import React from "react";
import { withRouter } from "react-router";
import setState from "react-state-promise";
import Post from "../reusable/components/Post";
import VisibilitySensor from "react-visibility-sensor";
import firebase from "firebase";
import List, { ListItem } from "material-ui/List";
import Button from "material-ui/Button";
import AddIcon from "material-ui-icons/Add";
import PostNew from "./Post-New";

class PostsInternal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], authors: [], loading: false, openNewPost: false };
  }
  fetchPosts() {
    if (
      this.state.posts &&
      typeof this.state.posts === "array" &&
      this.state.posts.length > 0
    ) {
      setState(this, (prevState, props) => ({
        loading: true
      }))
        .then(({ state, lastState }) =>
          firebase
            .firestore()
            .collection("adminPosts")
            .orderBy("createTime", "desc")
            .startAfter(this.state.posts[this.state.posts.length - 1])
            .limit(5)
            .get()
        )
        .then(querySnapshot =>
          Promise.all(
            querySnapshot.docs.map(doc =>
              doc
                .data()
                .author.get()
                .then(authorDoc =>
                  setState(this, (prevState, props) => ({
                    posts: [...prevState.posts, doc],
                    authors: [...prevState.authors, authorDoc]
                  }))
                )
            )
          )
        )
        .then(res => setState(this, { loading: false }))
        .catch(err => console.log(err));
    } else {
      setState(this, (prevState, props) => ({
        loading: true
      }))
        .then(({ state, lastState }) =>
          firebase
            .firestore()
            .collection("adminPosts")
            .orderBy("createTime", "desc")
            .limit(5)
            .get()
        )
        .then(querySnapshot =>
          Promise.all(
            querySnapshot.docs.map(doc =>
              doc
                .data()
                .author.get()
                .then(authorDoc =>
                  setState(this, (prevState, props) => ({
                    posts: [...prevState.posts, doc],
                    authors: [...prevState.authors, authorDoc]
                  }))
                )
            )
          )
        )
        .then(res => setState(this, { loading: false }))
        .catch(err => console.log(err));
    }
  }
  componentDidMount() {
    this.fetchPosts();
  }
  render() {
    return (
      <div>
        <List>
          {this.state.posts.map((post, index) => (
            <ListItem key={post.id}>
              <Post
                key={post.id}
                post={post.data()}
                author={this.state.authors[index].data()}
                isAdmin={false}
                actionHandler={(type, payload) => undefined}
              />
            </ListItem>
          ))}
        </List>

        <VisibilitySensor
          onChange={isVisible =>
            isVisible === true
              ? this.setState({ loading: true }, this.fetchPosts())
              : null}
        />
        <Button
          fab
          color="primary"
          aria-label="add"
          style={{
            margin: 0,
            top: "auto",
            right: 40,
            bottom: 40,
            left: "auto",
            position: "fixed"
          }}
          onClick={() => this.setState({ openNewPost: true })}
        >
          <AddIcon />
        </Button>
        <PostNew
          open={this.state.openNewPost}
          onClose={() => this.setState({ openNewPost: false })}
        />
      </div>
    );
  }
}

export default withRouter(PostsInternal);
