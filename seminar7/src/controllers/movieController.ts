import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import sc from '../modules/statusCode';
import rm from '../modules/responseMessage';
import { success, fail } from '../modules/util';
import { MovieCreateDTO, MovieUpdateDTO } from '../interfaces/movie/movieDTO';
import { movieService } from '../services';

/**
 *  @route POST /movie
 *  @desc 영화 생성
 *  @access Public
 */
const createMovie = async (req: Request, res: Response) => {
  const reqError = validationResult(req);

  if (!reqError.isEmpty()) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));

  const movieCreateDTO: MovieCreateDTO = req.body;

  try {
    const data = await movieService.createMovie(movieCreateDTO);

    return res.status(sc.CREATED).send(success(sc.CREATED, rm.CREATE_MOVIE_SUCCESS, data));
  } catch (error) {
    console.log(error);

    return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route PUT /movie/:movieId
 *  @desc 영화 수정
 *  @access Public
 */
const updateMovie = async (req: Request, res: Response) => {
  const movieUpdateDTO: MovieUpdateDTO = req.body;
  const { movieId } = req.params;

  try {
    await movieService.updateMovie(movieId, movieUpdateDTO);

    return res.status(sc.NO_CONTENT).send();
  } catch (error) {
    console.log(error);

    return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route GET /movie
 *  @desc 전체 영화 조회
 *  @access Public
 */
const getAllMovies = async (req: Request, res: Response) => {
  try {
    const data = await movieService.getAllMovies();

    return res.status(sc.OK).send(success(sc.OK, rm.READ_ALL_MOVIE_SUCCESS, data));
  } catch (error) {
    console.log(error);

    return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route GET /movie/:movieId
 *  @desc 영화 조회
 *  @access Public
 */
const getMovie = async (req: Request, res: Response) => {
  const { movieId } = req.params;

  try {
    const data = await movieService.getMovieById(movieId);

    if (!data) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_MOVIE));
    return res.status(sc.OK).send(success(sc.OK, rm.READ_MOVIE_SUCCESS, data));
  } catch (error) {
    console.log(error);

    return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route DELETE /movie/:movieId
 *  @desc 영화 삭제
 *  @access Public
 */
const deleteMovie = async (req: Request, res: Response) => {
  const { movieId } = req.params;

  try {
    await movieService.deleteMovie(movieId);

    return res.status(sc.NO_CONTENT).send();
  } catch (error) {
    console.log(error);

    return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

export default {
  createMovie,
  updateMovie,
  getAllMovies,
  getMovie,
  deleteMovie,
};
