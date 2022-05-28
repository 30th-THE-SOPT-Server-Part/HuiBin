import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import sc from '../modules/statusCode';
import rm from '../modules/responseMessage';
import { success, fail } from '../modules/util';
import { UserCreateDTO, UserUpdateDTO } from '../interfaces/user/userDTO';
import { userService } from '../services';

/**
 *  @route POST /user
 *  @desc 유저 생성
 *  @access Public
 */
const createUser = async (req: Request, res: Response) => {
  const reqError = validationResult(req);

  if (!reqError.isEmpty()) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));

  const userCreateDTO: UserCreateDTO = req.body;

  try {
    const data = await userService.createUser(userCreateDTO);

    return res.status(sc.CREATED).send(success(sc.CREATED, rm.CREATE_USER_SUCCESS, data));
  } catch (error) {
    console.log(error);

    return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route PUT /user/:userId
 *  @desc 유저 수정
 *  @access Public
 */
const updateUser = async (req: Request, res: Response) => {
  const userUpdateDTO: UserUpdateDTO = req.body;
  const { userId } = req.params;

  try {
    await userService.updateUser(userId, userUpdateDTO);

    return res.status(sc.NO_CONTENT).send();
  } catch (error) {
    console.log(error);

    return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route GET /user/:userId
 *  @desc 유저 조회
 *  @access Public
 */
const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const data = await userService.getUserById(userId);

    if (!data) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_USER));
    return res.status(sc.OK).send(success(sc.OK, rm.READ_USER_SUCCESS, data));
  } catch (error) {
    console.log(error);

    return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route DELETE /user/:userId
 *  @desc 유저 삭제
 *  @access Public
 */
const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    await userService.deleteUser(userId);

    return res.status(sc.NO_CONTENT).send();
  } catch (error) {
    console.log(error);

    return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

export default {
  createUser,
  updateUser,
  getUser,
  deleteUser,
};
