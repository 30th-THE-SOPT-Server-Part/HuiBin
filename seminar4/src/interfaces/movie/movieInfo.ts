import mongoose from 'mongoose';

export interface MovieInfo {
  _id: mongoose.Types.ObjectId;
  title: string;
  director: string;
  openingDate: Date;
  thumbnail: string;
  content: string;
}
