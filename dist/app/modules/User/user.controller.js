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
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_service_1 = require("./user.service");
const insertIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.insertIntoDB(req.body);
    const cookieOptions = {
        secure: config_1.default.env === 'production',
        httpOnly: true,
    };
    res.cookie('authorization', result.token, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User Created Successfully',
        data: result.UserData,
    });
}));
const UserSignIn = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.UserSignIn(req.body);
    const cookieOptions = {
        secure: config_1.default.env === 'production',
        httpOnly: true,
    };
    res.cookie('authorization', result.token, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User SignIn Successfully',
        token: result.token,
    });
}));
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   let verifiedToken = null;
    //   try {
    //     verifiedToken = jwtHelpers.verifyToken(
    //       req.cookies.token,
    //       config.jwt.secret as Secret
    //     );
    //   } catch (error) {
    //     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Token');
    //   }
    //   if (verifiedToken.role === 'admin') {
    const result = yield user_service_1.UserService.getAllUsers();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User retrieved Successfully',
        data: result,
    });
    //   } else {
    //     throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized Access');
    //   }
}));
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.getSingleUser(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single User data retrieved Successfully',
        data: result,
    });
}));
const deleteSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.deleteSingleUser(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single User data deleted Successfully',
        data: result,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.updateSingleUser(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single User data updated Successfully',
        data: result,
    });
}));
const userProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    let verifiedUser = null;
    if (token) {
        verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    }
    const userId = verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.userId;
    const result = yield user_service_1.UserService.getProfile(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single User data updated Successfully',
        data: result,
    });
}));
exports.UserController = {
    insertIntoDB,
    getAllUsers,
    UserSignIn,
    getSingleUser,
    deleteSingleUser,
    updateUser,
    userProfile,
};
