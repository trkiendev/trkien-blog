import { TagLookupDto } from "../tag/tag.model";
import { PostStatus } from "./post.model";

export interface AdminPostDetailDto {
      id: string;
      title: string;
      slug: string;
      contentJson: string;
      topicId: string;
      tagIds: string[];
      tagLookups: TagLookupDto[];
      thumbnailUrl?: string | null;
      status: PostStatus;
      createdAt: string;
      publishedAt: string;
}