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
    this.state = {
      posts: [],
      authors: [],
      commentss: [],
      loading: false,
      openNewPost: false
    };
  }
  fetchPosts = () => {
    if (
      this.state.posts &&
      this.state.posts.length &&
      this.state.posts.length > 0
    ) {
      console.log(this.state.posts[this.state.posts.length - 1]);
      setState(this, (prevState, props) => ({
        loading: true
      }))
        .then(({ state, lastState }) =>
          firebase
            .firestore()
            .collection("adminPosts")
            .orderBy("createTime", "desc")
            .startAfter(state.posts[state.posts.length - 1])
            .limit(5)
            .get()
        )
        .then(querySnapshot =>
          Promise.all(
            querySnapshot.docs.map(
              doc =>
                Promise.all([
                  doc.data().author.get(),
                  doc.ref
                    .collection("comments")
                    .orderBy("createTime", "desc")
                    .get()
                    .then(commentsQuerySnapshot =>
                      Promise.all(
                        commentsQuerySnapshot.docs.map(commentDoc =>
                          commentDoc
                            .data()
                            .author.get()
                            .then(commentAuthorDoc => {
                              return {
                                ...commentDoc.data(),
                                author: commentAuthorDoc.data(),
                                id: commentDoc.id
                              };
                            })
                        )
                      )
                    )
                ]).then(resolvedData =>
                  setState(this, (prevState, props) => ({
                    posts: [...prevState.posts, doc],
                    authors: [...prevState.authors, resolvedData[0]],
                    commentss: [...prevState.commentss, resolvedData[1]]
                  }))
                )
              // doc
              //   .data()
              //   .author.get()
              //   .then(authorDoc =>
              //     setState(this, (prevState, props) => ({
              //       posts: [...prevState.posts, doc],
              //       authors: [...prevState.authors, authorDoc]
              //     }))
              //   )
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
            querySnapshot.docs.map(
              doc =>
                Promise.all([
                  doc.data().author.get(),
                  doc.ref
                    .collection("comments")
                    .orderBy("createTime", "desc")
                    .get()
                    .then(commentsQuerySnapshot =>
                      Promise.all(
                        commentsQuerySnapshot.docs.map(commentDoc =>
                          commentDoc
                            .data()
                            .author.get()
                            .then(commentAuthorDoc => ({
                              ...commentDoc.data(),
                              author: commentAuthorDoc.data(),
                              id: commentDoc.id
                            }))
                        )
                      )
                    )
                ]).then(resolvedData =>
                  setState(this, (prevState, props) => ({
                    posts: [...prevState.posts, doc],
                    authors: [...prevState.authors, resolvedData[0]],
                    commentss: [...prevState.commentss, resolvedData[1]]
                  }))
                )
              // doc
              //   .data()
              //   .author.get()
              //   .then(authorDoc =>
              //     setState(this, (prevState, props) => ({
              //       posts: [...prevState.posts, doc],
              //       authors: [...prevState.authors, authorDoc]
              //     }))
              //   )
            )
          )
        )
        .then(res => setState(this, { loading: false }))
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        <List style={{ width: "100%" }}>
          {this.state.posts.map((post, index) => (
            <ListItem divider={false} key={post.id}>
              <Post
                style={{ width: "100%" }}
                key={post.id}
                post={post.data()}
                author={{
                  ...this.state.authors[index].data(),
                  id: this.state.authors[index].id
                }}
                comments={this.state.commentss[index]}
                isAdmin={window.currentUserPermissionLevel}
                actionHandler={(type, payload) => {
                  if (type === "navToUser" && typeof payload === "string") {
                    this.props.history.push("/users/" + payload);
                  }
                  if (type === "delete") {
                    firebase
                      .firestore()
                      .collection("adminPosts")
                      .doc(post.id)
                      .delete()
                      .then(() => {
                        alert("Post Deleted");
                        this.setState({ posts: [] }, () => this.fetchPosts());
                      })
                      .catch(err => {
                        alert("Post delete fail");
                        console.log(err);
                      });
                  }
                  if (
                    type === "comment" &&
                    typeof payload === "string" &&
                    payload
                  ) {
                    firebase
                      .firestore()
                      .collection("adminPosts")
                      .doc(post.id)
                      .collection("comments")
                      .add({
                        author: firebase
                          .firestore()
                          .collection("users")
                          .doc(firebase.auth().currentUser.uid),
                        createTime: Math.floor(Date.now() / 1000),
                        authorId: firebase.auth().currentUser.uid,
                        content: payload
                      })
                      .then(() => {
                        this.setState({ posts: [] }, () => this.fetchPosts());
                      })
                      .catch(err => {
                        alert("Comment fail");
                        console.log(err);
                      });
                  } else if (type === "comment") {
                    alert("Empty Comment");
                  }
                  if (
                    type === "deleteComment" &&
                    typeof payload === "string" &&
                    payload
                  ) {
                    firebase
                      .firestore()
                      .collection("adminPosts")
                      .doc(post.id)
                      .collection("comments")
                      .doc(payload)
                      .delete()
                      .then(() => {
                        alert("Comment deleted");
                        this.setState({ posts: [] }, () => this.fetchPosts());
                      })
                      .catch(err => {
                        alert("Comment fail");
                        console.log(err);
                      });
                  }
                }}
              />
            </ListItem>
          ))}
        </List>

        <VisibilitySensor
          onChange={isVisible =>
            isVisible === true
              ? this.setState({ loading: true }, this.fetchPosts)
              : null}
          delayedCall={true}
        />
        {window.currentUserPermissionLevel ? (
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
        ) : null}

        <PostNew
          open={this.state.openNewPost}
          onClose={() => this.setState({ openNewPost: false })}
          onNewPost={() =>
            this.setState({ posts: [] }, () => this.fetchPosts())}
        />
      </div>
    );
  }
}

export default withRouter(PostsInternal);
