import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import sc from '../modules/statusCode';
import rm from '../modules/responseMessage';
import { success, fail } from '../modules/util';
import { BlogPostDTO, BlogUpdateDTO } from '../interfaces/blog/blogDTO';
import { blogService } from '../services';

/**
 *  @route POST /blog
 *  @desc 블로그 게시글 작성
 *  @access Public
 */
const postBlog = async (req: Request, res: Response) => {
  const reqError = validationResult(req);

  if (!reqError.isEmpty()) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));

  const blogPostDTO: BlogPostDTO = req.body;

  try {
    const data = await blogService.createBlog(blogPostDTO);

    return res.status(sc.CREATED).send(success(sc.CREATED, rm.POST_BLOG_SUCCESS, data));
  } catch (error) {
    console.log(error);

    return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route PUT /blog/:blogId
 *  @desc 블로그 게시글 수정
 *  @access Public
 */
const updateBlog = async (req: Request, res: Response) => {
  const blogUpdateDTO: BlogUpdateDTO = req.body;
  const { blogId } = req.params;

  try {
    await blogService.updateBlog(blogId, blogUpdateDTO);

    return res.status(sc.NO_CONTENT).send();
  } catch (error) {
    console.log(error);

    return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route GET /blog/:blogId
 *  @desc 블로그 게시글 조회
 *  @access Public
 */
const getBlog = async (req: Request, res: Response) => {
  const { blogId } = req.params;

  try {
    const data = await blogService.getBlogById(blogId);

    if (!data) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_BLOG));
    return res.status(sc.OK).send(success(sc.OK, rm.READ_BLOG_SUCCESS, data));
  } catch (error) {
    console.log(error);

    return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route DELETE /blog/:blogId
 *  @desc 블로그 게시글 삭제
 *  @access Public
 */
const deleteBlog = async (req: Request, res: Response) => {
  const { blogId } = req.params;

  try {
    await blogService.deleteBlog(blogId);

    res.status(sc.NO_CONTENT).send();
  } catch (error) {
    console.log(error);

    res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

export default {
  postBlog,
  updateBlog,
  getBlog,
  deleteBlog,
};
