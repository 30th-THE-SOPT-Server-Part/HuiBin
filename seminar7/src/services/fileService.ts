import { FileResponseDTO, FileCreateDTO } from '../interfaces/file/fileDTO';
import File from '../models/File';

/**
 * @파일_생성
 */
const createFile = async (url: string, fileName: string) => {
  try {
    const file = new File({ url, fileName });

    await file.save();

    const data: FileResponseDTO = {
      id: file._id,
      url,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @여러_파일_생성
 */
const createFiles = async (fileCreateDTO: FileCreateDTO[]) => {
  try {
    const data: FileResponseDTO[] = await Promise.all(
      fileCreateDTO.map(async image => {
        const file = new File({
          url: image.location,
          fileName: image.originalname,
        });

        await file.save();

        return {
          id: file._id,
          url: file.url,
        };
      }),
    );

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createFile,
  createFiles,
};
