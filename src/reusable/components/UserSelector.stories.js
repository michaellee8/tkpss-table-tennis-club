import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import UserSelector from "./UserSelector";

const users = [
  {
    displayName: "Michael Test",
    searchName: "michaellee8",
    id: 1
  },
  {
    displayName: "Michael Test",
    searchName: "michaellee8",
    id: 2,
    photoUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple111/v4/4a/be/60/4abe60e1-6bec-5eb4-ecc5-a4c35771977f/source/512x512bb.jpg"
  },
  {
    displayName: "Michael Test",
    searchName: "michaellee8",
    id: 3
  },
  {
    displayName: "Michael Test",
    searchName: "michaellee8",
    id: 4,
    photoUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple111/v4/4a/be/60/4abe60e1-6bec-5eb4-ecc5-a4c35771977f/source/512x512bb.jpg"
  }
];

storiesOf("Component/UserSelector", module).add("with search", () => (
  <UserSelector
    showSearchBar={true}
    onSearch={text => {
      action(text);
      console.log(text);
    }}
    users={users}
  />
));
