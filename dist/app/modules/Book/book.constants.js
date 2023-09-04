"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRelationalMapper = exports.bookRelationalFields = exports.bookFilterableFields = exports.bookSearchableFields = void 0;
exports.bookSearchableFields = ['title', 'author', 'genre'];
exports.bookFilterableFields = [
    'searchTerm',
    'price',
    'categoryId',
    'minPrice',
    'maxPrice',
];
exports.bookRelationalFields = ['categoryId'];
exports.bookRelationalMapper = {
    categoryId: 'category',
};
