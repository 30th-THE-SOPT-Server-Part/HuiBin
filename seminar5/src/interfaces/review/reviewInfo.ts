import { MovieInfo } from '../movie/movieInfo';
import { UserInfo } from '../user/userInfo';

export interface ReviewInfo {
  writer: UserInfo;
  movie: MovieInfo;
  title: string;
  content: string;
}
