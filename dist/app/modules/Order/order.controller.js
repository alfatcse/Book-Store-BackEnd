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
exports.OrderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_service_1 = require("./order.service");
const insertIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    let verifiedUser = null;
    if (token) {
        verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    }
    req.body.userId = verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.userId;
    const result = yield order_service_1.OrderService.insertIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order Created Successfully',
        data: result,
    });
}));
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderService.getAllOrders();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order Created Successfully',
        data: result,
    });
}));
const getAllOrdersCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderService.getAllOrders();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order Created Successfully',
        data: result,
    });
}));
const getSingleOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const token = (_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.authorization;
    let verifiedUser = null;
    if (token) {
        verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    }
    const id = verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.userId;
    console.log(id);
    let result;
    if (id) {
        result = yield order_service_1.OrderService.getAllOrdersOfCustomers(id);
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order Created Successfully',
        data: result,
    });
}));
const getOrderById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const token = (_c = req === null || req === void 0 ? void 0 : req.headers) === null || _c === void 0 ? void 0 : _c.authorization;
    let verifiedUser = null;
    if (token) {
        verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    }
    const userId = verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.userId;
    let result;
    if (userId) {
        result = yield order_service_1.OrderService.getOrderById(req.params.orderId, userId);
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order Created Successfully',
        data: result,
    });
}));
exports.OrderController = {
    insertIntoDB,
    getAllOrders,
    getAllOrdersCustomer,
    getSingleOrder,
    getOrderById,
};
