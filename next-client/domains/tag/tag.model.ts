export interface TagPayload {
      name: string;
      slug: string;
}

export interface TagRequestForm {
      name: string;
      slug: string;
}

export interface TagDto {
      id: string;
      name: string;
      slug: string;
      isActive: boolean;
      isVisible: boolean;
      displayOrder: number;
      createdAt: string;
}

export interface TagTableDto {
      id: string;
      name: string;
      slug: string;
      isActive: boolean;
      isVisible: boolean;
}
