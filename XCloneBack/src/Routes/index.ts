import { Application } from "express";
import configurePosts from "./posts";
import configureUsers from "./users";
import configureAuth from "./auth";
import { configureComments } from "./comments";
import { configureLikes } from "./likes";
import { configureFollows } from "./follows";
import { configureBlocks } from "./blocks";

export function configureRoutes(app: Application) {
  configurePosts(app);
  configureUsers(app);
  configureAuth(app);
  configureComments(app);
  configureLikes(app);
  configureFollows(app);
  configureBlocks(app);
}
