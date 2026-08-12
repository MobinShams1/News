
export interface Category {
  id: string;
  name: string;
  slug?: string;
}

export interface CategoryWithCount extends Category {
  _count?: {
    articles: number;
  };
}