import { Document } from "mongoose";

export interface IStory extends Document {
  title: string;
  body: string;
  status: "public" | "private";
  user: any;
  createdAt: any;
}
