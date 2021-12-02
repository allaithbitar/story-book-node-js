import { RequestHandler } from "express";
import storyService from "../services/story.service";

declare global {
  namespace Express {
    interface User {
      id: string;
      googleId: string;
      displayName: string;
      firstName: string;
      lastName: string;
      image?: string;
      createdAt: any;
      _id: string;
    }
  }
}

const getPublicStories: RequestHandler = async (req, res) => {
  const stories = await storyService.getPublicStories();
  res.render("stories/index", {
    stories,
  });
};

const getUserStories: RequestHandler = async (req, res) => {
  const stories = await storyService.getUserStories(req.user?.id!);

  res.render("dashboard", {
    name: req.user?.firstName,
    stories,
  });
};

const renderAddStoryPage: RequestHandler = async (req, res) => {
  res.render("stories/add");
};

const addStory: RequestHandler = async (req, res) => {
  req.body.user = req.user?.id;

  await storyService.createStory(req.body);
  res.redirect("/dashboard");
};

const editStoryPage: RequestHandler = async (req, res) => {
  const story = await storyService.getStoryById(req.params.id);

  if (!story)
    return res.render("error", {
      errorMessageWithCode: "404 NOT FOUND",
      errorMessage: "story wasn't found",
    });

  if (story.user.toString() !== req.user?._id.toString())
    return res.redirect("/stories");

  return res.render("stories/edit", {
    story,
  });
};

const updateStory: RequestHandler = async (req, res) => {
  const story = await storyService.updateStoryById(req.params.id, req.body);
  res.redirect("/dashboard");
};

const deleteStory: RequestHandler = async (req, res) => {
  await storyService.deleteStoryById(req.params.id);
  res.redirect("/dashboard");
};

const renderSingleStoryPage: RequestHandler = async (req, res) => {
  const story = await storyService.getStoryByIdWithPopulatedUser(req.params.id);
  res.render("stories/show", {
    story,
  });
};

const renderPublicStoriesByUserPage: RequestHandler = async (req, res) => {
  const stories = await storyService.getPublicStoriesByUserId(
    req.params.userId
  );
  res.render("stories/index", { stories });
};

export default {
  getUserStories,
  renderAddStoryPage,
  addStory,
  getPublicStories,
  editStoryPage,
  updateStory,
  deleteStory,
  renderSingleStoryPage,
  renderPublicStoriesByUserPage,
};
