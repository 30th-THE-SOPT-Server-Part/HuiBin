import { SchoolInfo } from '../school/schoolInfo';

export interface UserCreateDTO {
  name: string;
  phone: string;
  email: string;
  age?: number;
  school?: SchoolInfo;
}

export interface UserUpdateDTO {
  name?: string;
  phone?: string;
  email?: string;
  age?: string;
  school?: SchoolInfo;
}

export type UserResponseDTO = UserCreateDTO;
