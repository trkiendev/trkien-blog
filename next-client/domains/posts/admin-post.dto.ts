import { PostStatus } from "./post.model";

export interface AdminPostDetailDto {
      id: string;
      title: string;
      contentJson: string;
      topicId: string;
      tagIds: string[];
      thumbnailUrl?: string | null;
      status: PostStatus;
      createdAt: string;
      publishedAt: string;
}