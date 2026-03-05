export interface TopicRequestPayload {
      name: string;
      image?: File;
}

export interface TopicRequestForm {
      name: string;
      image: File;
}

export interface TopicDto {
      id: string;
      name: string;
      imageUrl?: string | null;
}