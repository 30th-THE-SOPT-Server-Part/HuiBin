import mongoose from 'mongoose';
import { AuthorInfo } from '../user/userInfo';

export interface BlogPostDTO {
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId;
}

export interface BlogUpdateDTO {
  title?: string;
  content?: string;
}

export interface BlogResponseDTO {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  content: string;
  date: string;
  author: AuthorInfo;
}
