"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_router_1 = require("../modules/Book/book.router");
const category_route_1 = require("../modules/Category/category.route");
const order_route_1 = require("../modules/Order/order.route");
const user_ProfileRoute_1 = require("../modules/User/user.ProfileRoute");
const user_route_1 = require("../modules/User/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: user_route_1.UserRouter,
    },
    {
        path: '/users',
        route: user_route_1.UserRouter,
    },
    {
        path: '/categories',
        route: category_route_1.CategoryRouter,
    },
    {
        path: '/books',
        route: book_router_1.BookRouter,
    },
    {
        path: '/orders',
        route: order_route_1.OrderRouter,
    },
    {
        path: '/profile',
        route: user_ProfileRoute_1.UserProfileRouter,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
