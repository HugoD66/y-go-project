import { CreatePostDto } from "./dto/create-post.dto";
import { PostsService } from "./posts.services";
import { ResponsePostDto } from "./dto/response-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto): Promise<ResponsePostDto>;
    findOne(id: string): Promise<ResponsePostDto>;
    findAll(): Promise<ResponsePostDto[]>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<ResponsePostDto>;
    remove(id: string): Promise<void>;
}