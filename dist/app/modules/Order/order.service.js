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
exports.OrderService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, orderedBooks } = data;
    const order = yield prisma_1.default.order.create({
        data: {
            userId,
            orderedBooks: {
                createMany: {
                    data: orderedBooks.map((orBook) => ({
                        bookId: orBook.bookId,
                        quantity: orBook.quantity,
                    })),
                },
            },
        },
        include: {
            orderedBooks: true,
        },
    });
    return order;
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findMany({
        include: {
            orderedBooks: true,
        },
    });
    return result;
});
const getAllOrdersOfCustomers = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findFirst({
        where: {
            userId: id,
        },
        include: {
            orderedBooks: true,
        },
    });
    return result;
});
const getOrderById = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findFirst({
        where: {
            id,
            userId,
        },
        include: {
            orderedBooks: true,
        },
    });
    return result;
});
exports.OrderService = {
    insertIntoDB,
    getAllOrders,
    getAllOrdersOfCustomers,
    getOrderById,
};
