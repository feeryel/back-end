import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from './dto/post-create.dto';
import { UpdatePostDto } from './dto/post-update.dto';
import { PostService } from './post.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  //   @Post method
  // create post
  // path : /create
  @Post('create')
  async newPost(@Body() createPostDto: CreatePostDto) {
    const creation = await this.postService.createPost(createPostDto);
    return creation;
  }
  @Put(':id/update')
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return await this.postService.updatePost(id, updatePostDto);
  }
  //   @get method
  // get all posts
  // path : /posts
  @Get('posts')
  @UseGuards(JwtAuthGuard)
  @SetMetadata('role', [Role.Admin])
  // @Roles(Role.Admin)
  async getAllPosts() {
    return await this.postService.getAllPosts();
  }

  //   @get method
  // get all filtred posts
  // path : /posts/filter
  @Get('posts/filter')
  async getAllPostsFiltred(@Query('search') search: string) {
    return await this.postService.getAllPostsFiltred(search);
  }
  //   @get method
  // get one post
  // path : :id/post
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.postService.getPost(id);
  }
  //   @delete method
  // delete post
  // path : /delete
  @Delete(':id/delete')
  async deletePost(@Param('id') id: string) {
    return await this.postService.deletePost(id);
  }
}
