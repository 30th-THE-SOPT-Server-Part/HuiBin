import mongoose from 'mongoose';
import { ReviewInfo } from '../interfaces/review/reviewInfo';

const ReviewSchema = new mongoose.Schema(
  {
    writer: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    movie: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Movie',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model<ReviewInfo & mongoose.Document>('Review', ReviewSchema);
