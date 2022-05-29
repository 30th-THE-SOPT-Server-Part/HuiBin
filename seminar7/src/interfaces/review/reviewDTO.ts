import mongoose from 'mongoose';
import { MovieResponseDTO } from '../movie/movieDTO';

export interface ReviewCreateDTO {
  writer: mongoose.Types.ObjectId;
  title: string;
  content?: string;
}

export interface ReviewResponseDTO {
  writer: string;
  title: string;
  content: string;
}

export interface ReviewsResponseDTO {
  movie: MovieResponseDTO;
  reviews: ReviewResponseDTO[];
  lastPage: number;
}
