"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const pass = yield bcrypt_1.default.hash(data.password, Number(config_1.default.bycrypt_salt_rounds));
    data.password = pass;
    const result = yield prisma_1.default.user.create({
        data,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.SERVICE_UNAVAILABLE, 'Unable to create User');
    }
    const token = jwtHelpers_1.jwtHelpers.createToken({ userId: result === null || result === void 0 ? void 0 : result.id, role: result === null || result === void 0 ? void 0 : result.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return { UserData: result, token: token };
});
const UserSignIn = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = data;
    const result = yield prisma_1.default.user.findFirst({
        where: { email },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const passwordMatch = yield bcrypt_1.default.compare(data.password, result === null || result === void 0 ? void 0 : result.password);
    if (passwordMatch) {
        const token = jwtHelpers_1.jwtHelpers.createToken({ userId: result === null || result === void 0 ? void 0 : result.id, role: result === null || result === void 0 ? void 0 : result.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
        return {
            token: token,
        };
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Password not matched');
    }
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    return result;
});
const deleteSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.delete({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    return result;
});
const updateSingleUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.password) {
        const pass = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bycrypt_salt_rounds));
        payload.password = pass;
    }
    const result = yield prisma_1.default.user.update({
        where: { id },
        data: payload,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    return result;
});
const getProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: { id },
        select: {
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
            password: true,
        },
    });
    return result;
});
exports.UserService = {
    insertIntoDB,
    getAllUsers,
    UserSignIn,
    getSingleUser,
    deleteSingleUser,
    updateSingleUser,
    getProfile,
};
