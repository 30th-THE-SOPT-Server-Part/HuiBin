import { BlogResponseDTO, BlogPostDTO, BlogUpdateDTO } from '../interfaces/blog/blogDTO';
import { BaseResponseDTO } from '../interfaces/base/baseDTO';
import Blog from '../models/Blog';

/**
 * @블로그_게시글_생성
 */
const createBlog = async (blogPostDTO: BlogPostDTO) => {
  try {
    const blog = new Blog(blogPostDTO);

    await blog.save();

    const data: BaseResponseDTO = {
      _id: blog._id,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @블로그_게시글_수정
 */
const updateBlog = async (blogId: string, blogUpdateDTO: BlogUpdateDTO) => {
  try {
    await Blog.findByIdAndUpdate(blogId, blogUpdateDTO);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @Id로_블로그_게시글_조회
 */
const getBlogById = async (blogId: string) => {
  try {
    const blog = await Blog.findById(blogId).populate('author', ['_id', 'name']);

    if (!blog) return null;

    const data: BlogResponseDTO = {
      _id: blog._id,
      title: blog.title,
      content: blog.content,
      date: blog.createdAt.toLocaleDateString(),
      author: {
        _id: blog.author._id,
        name: blog.author.name,
      },
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @블로그_게시글_삭제
 */
const deleteBlog = async (blogId: string) => {
  try {
    await Blog.findByIdAndDelete(blogId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
};
