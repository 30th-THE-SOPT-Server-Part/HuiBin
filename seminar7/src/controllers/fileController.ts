import { Request, Response } from 'express';
import sc from '../modules/statusCode';
import rm from '../modules/responseMessage';
import { success, fail } from '../modules/util';
import { fileService } from '../services';
import { FileCreateDTO } from '../interfaces/file/fileDTO';

/**
 *  @route POST /file
 *  @desc 파일 업로드
 *  @access public
 */
const uploadFile = async (req: Request, res: Response) => {
  if (!req.file) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));

  const image = req.file as Express.MulterS3.File;
  const { location, originalname } = image;

  try {
    const data = await fileService.createFile(location, originalname);

    return res.status(sc.CREATED).send(success(sc.CREATED, rm.CREATE_FILE_SUCCESS, data));
  } catch (error) {
    console.log(error);

    return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route POST /file
 *  @desc 여러 파일 업로드
 *  @access public
 */
const uploadFiles = async (req: Request, res: Response) => {
  if (!req.files) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));

  const images = req.files as Express.MulterS3.File[];

  try {
    const imageList: FileCreateDTO[] = await Promise.all(
      images.map(image => ({
        location: image.location,
        originalname: image.originalname,
      })),
    );
    const data = await fileService.createFiles(imageList);

    return res.status(sc.CREATED).send(success(sc.CREATED, rm.CREATE_FILE_SUCCESS, data));
  } catch (error) {
    console.log(error);

    return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

export default {
  uploadFile,
  uploadFiles,
};
