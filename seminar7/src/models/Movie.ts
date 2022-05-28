import mongoose from 'mongoose';
import { MovieInfo } from '../interfaces/movie/movieInfo';

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  openingDate: {
    type: Date,
  },
  thumbnail: {
    type: String,
  },
  content: {
    type: String,
  },
});

export default mongoose.model<MovieInfo & mongoose.Document>('Movie', MovieSchema);
