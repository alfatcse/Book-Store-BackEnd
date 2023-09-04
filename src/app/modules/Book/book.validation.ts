import { z } from 'zod';
const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
    author: z.string({
      required_error: 'Author Name is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    publicationDate: z.string({
      required_error: 'Publication Date required',
    }),
    categoryId: z.string({
      required_error: 'Category Id is required',
    }),
  }),
});
const update = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});
export const BookValidation = {
  create,
  update,
};
