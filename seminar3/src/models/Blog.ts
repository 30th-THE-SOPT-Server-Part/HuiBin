import mongoose from 'mongoose';
import { BlogInfo } from '../interfaces/blog/blogInfo';

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export default mongoose.model<BlogInfo & mongoose.Document>('Blog', BlogSchema);
