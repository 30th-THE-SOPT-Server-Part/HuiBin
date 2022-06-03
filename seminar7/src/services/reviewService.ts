import { BaseResponseDTO } from '../interfaces/base/baseDTO';
import { ReviewCreateDTO, ReviewResponseDTO, ReviewsResponseDTO } from '../interfaces/review/reviewDTO';
import { ReviewOptionType } from '../interfaces/review/reviewType';
import { regex } from '../modules/library';
import Review from '../models/Review';

/**
 * @리뷰_생성
 */
const createReview = async (reviewCreateDTO: ReviewCreateDTO, movieId: string) => {
  try {
    const review = new Review({
      ...reviewCreateDTO,
      movie: movieId,
    });

    await review.save();

    const data: BaseResponseDTO = {
      _id: review.id,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @영화_Id로_리뷰_조회
 */
const getReviewsByMovieId = async (movieId: string, page: number) => {
  try {
    const perPage = 2;
    const reviews = await Review.find({ movie: movieId })
      .populate('writer')
      .sort({ created: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage);

    const reviewData: ReviewResponseDTO[] = reviews.map((review: any) => ({
      writer: review.writer.name,
      title: review.title,
      content: review.content,
    }));

    const total = await Review.countDocuments({ movie: movieId });
    const lastPage = Math.ceil(total / perPage);
    const data = { reviews: reviewData, lastPage };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @리뷰_검색
 */
const searchReview = async (movieId: string, search: string, option: ReviewOptionType, page: number) => {
  try {
    let reviews = [];
    const pattern = regex(search);
    const perPage = 2;

    if (option === 'title') {
      reviews = await Review.find({ title: { $regex: pattern }, movie: movieId })
        .populate('writer')
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage);
    } else if (option === 'content') {
      reviews = await Review.find({ content: { $regex: pattern }, movie: movieId })
        .populate('writer')
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage);
    } else {
      reviews = await Review.find({
        $or: [{ title: { $regex: pattern } }, { content: { $regex: pattern } }],
        movie: movieId,
      })
        .populate('writer')
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage);
    }

    const reviewData = reviews.map((review: any) => ({
      writer: review.writer.name,
      title: review.title,
      content: review.content,
    }));

    const total = await Review.countDocuments({ movie: movieId });
    const lastPage = Math.ceil(total / perPage);
    const data = { reviews: reviewData, lastPage };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createReview,
  getReviewsByMovieId,
  searchReview,
};
