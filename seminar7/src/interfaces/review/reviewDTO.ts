import mongoose from 'mongoose';
import { MovieInfo } from '../movie/movieInfo';

export interface ReviewCreateDTO {
  writer: mongoose.Types.ObjectId;
  title: string;
  content?: string;
}

export interface ReviewResponseDTO {
  writer: string;
  title: string;
  content: string;
  movie: MovieInfo;
}
