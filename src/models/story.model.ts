import mongoose from "mongoose";
import { IStory } from "../interfaces/story.interface";
import { IUser } from "../interfaces/user.interface";

const StorySchema = new mongoose.Schema<IStory>({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: "public",
    enum: ["public", "private"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IStory>("Story", StorySchema);
