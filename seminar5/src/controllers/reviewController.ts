import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import sc from '../modules/statusCode';
import rm from '../modules/responseMessage';
import { success, fail } from '../modules/util';
import { ReviewCreateDTO } from '../interfaces/review/reviewDTO';
import { reviewService } from '../services';

/**
 *  @route POST /review/movies/:movieId
 *  @desc 영화 리뷰 작성
 *  @access Public
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
 *  @route GET /review/movies/:movieId
 *  @desc 영화 리뷰 조회
 *  @access Public
 */
const getReviews = async (req: Request, res: Response) => {
  const { movieId } = req.params;

  try {
    const data = await reviewService.getReviewsByMovieId(movieId);

    return res.status(sc.OK).send(success(sc.OK, rm.READ_REVIEW_SUCCESS, data));
  } catch (error) {
    console.log(error);

    return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

export default {
  createReview,
  getReviews,
};
