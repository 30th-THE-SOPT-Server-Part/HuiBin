import { MovieCreateDTO, MovieResponseDTO, MoviesResponseDTO, MovieUpdateDTO } from '../interfaces/movie/movieDTO';
import { BaseResponseDTO } from '../interfaces/base/baseDTO';
import { regex } from '../modules/library';
import Movie from '../models/Movie';
import { MovieOptionType } from '../interfaces/movie/movieType';

/**
 * @영화_생성
 */
const createMovie = async (movieCreateDTO: MovieCreateDTO) => {
  try {
    const movie = new Movie(movieCreateDTO);

    await movie.save();

    const data: BaseResponseDTO = {
      id: movie.id,
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
const getAllMovies = async (page: number) => {
  try {
    const perPage = 2;
    const movies: MovieResponseDTO[] = await Movie.find({}, 'title director thumbnail content')
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage);

    const total = await Movie.countDocuments();
    const lastPage = Math.ceil(total / perPage);
    const data: MoviesResponseDTO = {
      movies,
      lastPage,
    };

    return data;
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
    const movie: MovieResponseDTO | null = await Movie.findById(movieId, 'title director thumbnail content');

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

/**
 * @영화_검색
 */
const searchMovie = async (search: string, option: MovieOptionType, page: number) => {
  try {
    let movies: MovieResponseDTO[] = [];
    const pattern = regex(search);
    const perPage = 2;

    if (option === 'title') {
      movies = await Movie.find({ title: { $regex: pattern } }, 'title director thumbnail content')
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage);
    } else if (option === 'director') {
      movies = await Movie.find({ director: { $regex: pattern } }, 'title director thumbnail content')
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage);
    } else {
      movies = await Movie.find(
        {
          $or: [{ title: { $regex: pattern } }, { director: { $regex: pattern } }],
        },
        'title director thumbnail content',
      )
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage);
    }

    const total = await Movie.countDocuments();
    const lastPage = Math.ceil(total / perPage);
    const data: MoviesResponseDTO = {
      movies,
      lastPage,
    };

    return data;
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
  searchMovie,
};
