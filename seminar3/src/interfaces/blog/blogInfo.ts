import mongoose from 'mongoose';

export interface BlogInfo {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
