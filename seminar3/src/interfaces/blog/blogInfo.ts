import { BaseResponseDTO } from '../base/baseDTO';
import { UserInfo } from '../user/userInfo';

export interface BlogInfo {
  title: string;
  content: string;
  author: BaseResponseDTO & UserInfo;
  createdAt: Date;
  updatedAt: Date;
}
