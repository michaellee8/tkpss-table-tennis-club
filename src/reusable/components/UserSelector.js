/* @flow */
import React from "react";
import type { User } from "../types/User";

type Props = {
  usage: "view" | "tickbox" | "search",
  users: Array<User>
};
