import { Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  googleId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  image?: string;
  createdAt: any;
}
