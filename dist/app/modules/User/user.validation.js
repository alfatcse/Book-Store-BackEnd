"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is Required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is Required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is Required',
        }),
        role: zod_1.z.string({
            required_error: 'Role is Required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'ContactNo is Required',
        }),
        address: zod_1.z.string({
            required_error: 'Address is Required',
        }),
        profileImg: zod_1.z.string({
            required_error: 'ProfileImg is Required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        role: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        profileImg: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    create,
    update,
};