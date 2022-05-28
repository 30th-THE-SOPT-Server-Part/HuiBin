import { AllMovieResponseDTO, MovieCreateDTO, MovieResponseDTO, MovieUpdateDTO } from '../interfaces/movie/movieDTO';
import { BaseResponseDTO } from '../interfaces/base/baseDTO';
import Movie from '../models/Movie';

/**
 * @영화_생성
 */
const createMovie = async (movieCreateDTO: MovieCreateDTO) => {
  try {
    const movie = new Movie(movieCreateDTO);

    await movie.save();

    const data: BaseResponseDTO = {
      _id: movie.id,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @영화_수정
 */
const updateMovie = async (movieId: string, movieUpdateDTO: MovieUpdateDTO) => {
  try {
    await Movie.findByIdAndUpdate(movieId, movieUpdateDTO);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @전체_영화_조회
 */
const getAllMovies = async () => {
  try {
    const movies: AllMovieResponseDTO[] = await Movie.find({}, 'title thumbnail');

    return movies;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @Id로_영화_조회
 */
const getMovieById = async (movieId: string) => {
  try {
    const movie: MovieResponseDTO | null = await Movie.findById(movieId);

    if (!movie) return null;
    return movie;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @영화_삭제
 */
const deleteMovie = async (movieId: string) => {
  try {
    await Movie.findByIdAndDelete(movieId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createMovie,
  updateMovie,
  getAllMovies,
  getMovieById,
  deleteMovie,
};
