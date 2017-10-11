import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import Post from "./Post";

const photoUrl =
  "https://is1-ssl.mzstatic.com/image/thumb/Purple111/v4/4a/be/60/4abe60e1-6bec-5eb4-ecc5-a4c35771977f/source/512x512bb.jpg";

storiesOf("Component/Post", module).add("show post", () => (
  <Post
    post={{
      mediaUrls: [photoUrl],
      content: "test content \n test content",
      title: "test title",
      mentioned: { "1": true },
      authorId: "1",
      timestamp: 1506327144
    }}
  />
));
