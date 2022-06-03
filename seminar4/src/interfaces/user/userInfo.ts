import mongoose from 'mongoose';
import { SchoolInfo } from '../school/schoolInfo';

export interface UserInfo {
  _id: mongoose.Types.ObjectId;
  name: string;
  phone: string;
  email: string;
  age: number;
  school: SchoolInfo;
}
