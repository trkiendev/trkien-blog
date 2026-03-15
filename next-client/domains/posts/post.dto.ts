import { TopicLookupDto } from "../topic/topic.model";
import { PostStatus } from "./post.model";

export interface PostTableDto {
      id: string;
      title: string;
      topicId: string;
      topic?: TopicLookupDto | null;
      tagIds: string[];
      thumbnailUrl?: string | null;
      status: PostStatus;
      createdAt: string;
      publishedAt: string;
}