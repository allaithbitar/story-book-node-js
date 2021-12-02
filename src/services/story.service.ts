import { IStory } from "../interfaces/story.interface";
import storyModel from "../models/story.model";

const getPublicStories = async () => {
  const stories = await storyModel
    .find({ status: "public" })
    .populate("user")
    .sort({ createdAt: "desc" })
    .lean();
  return stories;
};

const getUserStories = async (userId: string) => {
  try {
    //@ts-ignore
    const stories = await storyModel.find({ user: userId }).lean();
    return stories;
  } catch (error) {
    console.log(error);
  }
};

const createStory = async (story: IStory) => {
  try {
    await storyModel.create(story);
  } catch (error) {
    console.log(error);
  }
};

const getStoryById = async (storyId: string) => {
  const story = await storyModel.findOne({ _id: storyId }).lean();
  return story;
};

const updateStoryById = async (storyId: string, updatedStory: IStory) => {
  const story = await storyModel.findOneAndUpdate(
    { _id: storyId },
    updatedStory,
    { new: true, runValidators: true }
  );
};
const deleteStoryById = async (storyId: string) => {
  await storyModel.remove({ _id: storyId });
};
const getStoryByIdWithPopulatedUser = async (storyId: string) => {
  const story = await storyModel
    .findOne({ _id: storyId })
    .populate("user")
    .lean();
  return story;
};

const getPublicStoriesByUserId = async (userId: string) => {
  const stories = await storyModel
    .find({ user: userId, status: "public" })
    .populate("user")
    .lean();
  return stories;
};

export default {
  getUserStories,
  createStory,
  getPublicStories,
  getStoryById,
  deleteStoryById,
  updateStoryById,
  getStoryByIdWithPopulatedUser,
  getPublicStoriesByUserId,
};
