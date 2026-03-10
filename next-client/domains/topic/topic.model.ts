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

export interface TopicLookupDto {
      id: string;
      name: string;
      imageKey?: string | null;
}