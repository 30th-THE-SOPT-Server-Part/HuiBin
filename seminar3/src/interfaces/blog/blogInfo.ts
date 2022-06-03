import mongoose from 'mongoose';
import { UserInfo } from '../user/userInfo';

export interface BlogInfo {
  _id: mongoose.Types.ObjectId;
  title: string;
  content: string;
  author: UserInfo;
  createdAt: Date;
  updatedAt: Date;
}
