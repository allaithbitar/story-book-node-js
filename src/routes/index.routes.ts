import { RequestHandler, Router } from "express";
import storyController from "../controllers/story.controller";
import { ensureAuth, ensureGuest } from "../middleware/auth.middleware";

const indexRouter = Router();

indexRouter.get("/", ensureGuest, (req, res) => {
  res.render("login", { layout: "login" });
});

indexRouter.get("/dashboard", ensureAuth, storyController.getUserStories);

export default indexRouter;
