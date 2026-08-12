export interface UserItem {
  id: string;
  name: string | null;
  phone: string;
  role? : string;
  createdAt?: Date | string;
  _count?: {
    articles: number;
  };
}
