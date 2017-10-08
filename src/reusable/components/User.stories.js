import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import User from "./User";

var userData = {
  createTime: 1507194350,
  displayName: "tester",
  email: "test@test.com",
  joinYear: 2017,
  lastLoginTime: null,
  permission: 3,
  photoUrl: "https://thumbs.dreamstime.com/z/lovely-pig-21738319.jpg",
  remark: "tester by developer",
  score: 95,
  stats: { atk: 90, cot: 90, def: 90, hp: 90, int: 90, spe: 90 }
};
storiesOf("Component/User", module).add("Admin user", () => (
  <User user={userData} />
));
