import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import sc from '../modules/statusCode';
import rm from '../modules/responseMessage';
import { success, fail } from '../modules/util';
import { ReviewCreateDTO, ReviewsResponseDTO } from '../interfaces/review/reviewDTO';
import { ReviewOptionType } from '../interfaces/review/reviewType';
import { movieService, reviewService } from '../services';

/**
 *  @route POST /review/movies/:movieId
 *  @desc 영화 리뷰 작성
 *  @access public
 */
const createReview = async (req: Request, res: Response) => {
  const reqError = validationResult(req);

  if (!reqError.isEmpty()) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));

  const reviewCreateDTO: ReviewCreateDTO = req.body;
  const { movieId } = req.params;

  try {
    const data = await reviewService.createReview(reviewCreateDTO, movieId);

    return res.status(sc.CREATED).send(success(sc.CREATED, rm.CREATE_REVIEW_SUCCESS, data));
  } catch (error) {
    console.log(error);

    return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route GET /review/movies/:movieId?page=&search=&option=
 *  @desc 영화 리뷰 조회
 *  @access public
 */
const searchReview = async (req: Request, res: Response) => {
  const { movieId } = req.params;
  const { search, option } = req.query;
  const page = Number(req.query.page || 1);

  let type: 'search' | 'read' | null;

  if (search && option) {
    type = 'search';

    const isOptionType = (value: string): value is ReviewOptionType => {
      return ['title', 'content', 'title_content'].includes(value);
    };

    if (!isOptionType(option as string)) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));
  } else if (!search && !option) type = 'read';
  else type = null;

  try {
    switch (type) {
      case 'search': {
        const [movie, reviews] = await Promise.all([
          movieService.getMovieById(movieId),
          reviewService.searchReview(movieId, search as string, option as ReviewOptionType, page),
        ]);

        if (!movie) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_MOVIE));

        const data: ReviewsResponseDTO = { movie, ...reviews };

        return res.status(sc.OK).send(success(sc.OK, rm.SEARCH_REVIEW_SUCCESS, data));
      }
      case 'read': {
        const [movie, reviews] = await Promise.all([
          movieService.getMovieById(movieId),
          reviewService.getReviewsByMovieId(movieId, page),
        ]);

        if (!movie) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_MOVIE));

        const data: ReviewsResponseDTO = { movie, ...reviews };

        return res.status(sc.OK).send(success(sc.OK, rm.READ_REVIEW_SUCCESS, data));
      }
      default:
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));
    }
  } catch (error) {
    console.log(error);

    return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

export default {
  createReview,
  searchReview,
};
