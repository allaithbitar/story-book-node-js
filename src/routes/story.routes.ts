import { RequestHandler, Router } from "express";
import storyController from "../controllers/story.controller";
import { ensureAuth } from "../middleware/auth.middleware";

const storyRouter = Router();

storyRouter.post("/", ensureAuth, storyController.addStory);

storyRouter.get("/", ensureAuth, storyController.getPublicStories);

storyRouter.get("/add", ensureAuth, storyController.renderAddStoryPage);

storyRouter.get("/edit/:id", ensureAuth, storyController.editStoryPage);

storyRouter.get("/:id", ensureAuth, storyController.renderSingleStoryPage);

storyRouter.put("/:id", ensureAuth, storyController.updateStory);

storyRouter.delete("/:id", ensureAuth, storyController.deleteStory);

storyRouter.get(
  "/user/:userId",
  ensureAuth,
  storyController.renderPublicStoriesByUserPage
);
export default storyRouter;
