import { Category } from "./category";

export interface Article {
  id: string;
  title: string;
  summary?: string | null;
  content?: string;
  coverImage: string | null;
  viewsCount?: number;
  createdAt: Date | Date;
  isBreaking?: boolean;
  categoryId?: string | null; 
  
  category?: Category | null;
}