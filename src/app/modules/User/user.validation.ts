import { z } from 'zod';
const create = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is Required',
    }),
    email: z.string({
      required_error: 'Email is Required',
    }),
    password: z.string({
      required_error: 'Password is Required',
    }),
    role: z.string({
      required_error: 'Role is Required',
    }),
    contactNo: z.string({
      required_error: 'ContactNo is Required',
    }),
    address: z.string({
      required_error: 'Address is Required',
    }),
    profileImg: z.string({
      required_error: 'ProfileImg is Required',
    }),
  }),
});
const update = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    role: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});
export const UserValidation = {
  create,
  update,
};
