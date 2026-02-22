export type TopicRequestPayload = {
      name: string;
      image?: File;
}

export type TopicRequestForm = {
      name: string;
      image: File;
}

export type TopicDto = {
      id: string;
      name: string;
      imageUrl?: string | null;
}