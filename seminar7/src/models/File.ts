import mongoose from 'mongoose';
import { FileInfo } from '../interfaces/file/fileInfo';

const FileSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<FileInfo & mongoose.Document>('File', FileSchema);
