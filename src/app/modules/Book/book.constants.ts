export const bookSearchableFields: string[] = ['title', 'author', 'genre'];
export const bookFilterableFields: string[] = [
  'searchTerm',
  'price',
  'categoryId',
  'minPrice',
  'maxPrice',
];
export const bookRelationalFields: string[] = ['categoryId'];
export const bookRelationalMapper: { [key: string]: string } = {
  categoryId: 'category',
};
