export interface PostPayload {
      title: string;
      slug: string;
      contentJson: string;
      topicId: string;
      tagIds: string[];
      thumbnail?: File;
}

export interface PostForm{
      title: string;
      slug: string;
      contentJson: string;
      topicId: string;
      tagIds: string[];
      thumbnail?: File;
}