import { SchoolInfo } from '../school/schoolInfo';

export interface UserInfo {
  name: string;
  phone: string;
  email: string;
  age: number;
  school: SchoolInfo;
}
