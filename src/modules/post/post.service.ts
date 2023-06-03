import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/post-create.dto';
import { UpdatePostDto } from './dto/post-update.dto';
import { Post } from './model/post.model';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly _postRepository: Repository<Post>,
  ) {}

  // Create post
  async createPost(createPostDto: CreatePostDto) {
    const post = await this._postRepository.save(createPostDto);
    return post;
  }

  // Update post
  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    return await this._postRepository.update(id, updatePostDto);
  }

  // Get all posts
  async getAllPosts() {
    return await this._postRepository.find();
  }
  // Get all filtred posts
  async getAllPostsFiltred(search: string) {
    const query = this._postRepository
      .createQueryBuilder('post')
      .where(
        'post.label1 LIKE :search OR post.label2 LIKE :search OR post.label3 LIKE :search OR post.label4 LIKE :search OR post.label5 LIKE :search OR post.jobTitle LIKE :search OR post.description LIKE :search',
        {
          search: `%${search}%`,
        },
      );
    return query.getMany();
  }
  // Get one post
  async getPost(id: string) {
    return await this._postRepository.findOne({ where: { id: id } });
  }
  // delete post
  async deletePost(id: string) {
    return await this._postRepository.delete(id);
  }
}
