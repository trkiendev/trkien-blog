export type PostStatus = "Draft" | "Published" | "Archived";

export interface PostPayload {
      title: string;
      slug: string;
      contentJson: string;
      topicId: string;
      tagIds: string[];
      thumbnail?: File;
}

export interface PostFormData{
      title: string;
      slug: string;
      contentJson: string;
      topicId: string;
      tagIds: string[];
      thumbnail?: File;
}