import { ObjectId } from "mongoose";

export interface IUser {
  id?: ObjectId | string;
  name?: string;
  email?: string;
  password?: string;
}
