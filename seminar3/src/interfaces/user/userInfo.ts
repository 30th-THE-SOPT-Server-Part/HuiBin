import mongoose from 'mongoose';
import { SchoolInfo } from '../school/schoolInfo';

export interface UserInfo {
  name: string;
  phone: string;
  email: string;
  age: number;
  school: SchoolInfo;
}

export interface AuthorInfo {
  _id: mongoose.Types.ObjectId;
  name: string;
}
