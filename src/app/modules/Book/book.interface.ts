export type IBook = {
  title: string;
  author: string;
  genre: string;
  price: number;
  publicationDate: string;
  categoryId: string;
};
export type IBookFilterRequest = {
  title?: string | undefined;
  author?: string | undefined;
  genre?: string | undefined;
  price?: number | undefined;
  publicationDate?: string | undefined;
  categoryId?: string | undefined;
  searchTerm?: string | undefined;
};
