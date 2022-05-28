import { BaseResponseDTO } from '../interfaces/base/baseDTO';
import { ReviewCreateDTO, ReviewResponseDTO } from '../interfaces/review/reviewDTO';
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
const getReviewsByMovieId = async (movieId: string) => {
  try {
    const reviews = await Review.find({ movie: movieId }).populate('writer', 'name').populate('movie');

    const data: ReviewResponseDTO[] = reviews.map(review => ({
      writer: review.writer.name,
      title: review.title,
      content: review.content,
      movie: review.movie,
    }));

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createReview,
  getReviewsByMovieId,
};
