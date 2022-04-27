import { UserCreateDTO, UserResponseDTO, UserUpdateDTO } from '../interfaces/user/userDTO';
import { BaseResponseDTO } from '../interfaces/base/baseDTO';
import User from '../models/User';

/**
 * @유저_생성
 */
const createUser = async (userCreateDTO: UserCreateDTO) => {
  try {
    const user = new User(userCreateDTO);

    await user.save();

    const data: BaseResponseDTO = {
      _id: user.id,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @유저_수정
 */
const updateUser = async (userId: string, userUpdateDTO: UserUpdateDTO) => {
  try {
    const user = {
      name: userUpdateDTO.name,
      phone: userUpdateDTO.phone,
      email: userUpdateDTO.email,
      age: userUpdateDTO.age,
      school: userUpdateDTO.school,
    };

    await User.findByIdAndUpdate(userId, user);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @Id로_유저_조회
 */
const getUserById = async (userId: string) => {
  try {
    const user: UserResponseDTO | null = await User.findById(userId);

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @유저_삭제
 */
const deleteUser = async (userId: string) => {
  try {
    await User.findByIdAndDelete(userId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createUser,
  updateUser,
  getUserById,
  deleteUser,
};
