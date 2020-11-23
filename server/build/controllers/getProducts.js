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
exports.getProducts = void 0;
const types_1 = require("../types");
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.use(express_1.default.json());
const products = [
    { id: 1, name: "a", url: "123", price: 100, description: "첫번째 제품", rating: "7.8 / 10", size: types_1.productSizeType.LARGE },
    { id: 2, name: "b", url: "122", price: 200, description: "두번째 제품", rating: "8.8 / 10", size: types_1.productSizeType.MEDIUM },
    { id: 3, name: "c", url: "124", price: 300, description: "세번째 제품", rating: "9.8 / 10", size: types_1.productSizeType.SMALL },
    { id: 4, name: "d", url: "125", price: 400, description: "네번째 제품", rating: "6.8 / 10", size: types_1.productSizeType.LARGE },
    { id: 5, name: "e", url: "126", price: 500, description: "다섯번째 제품", rating: "10 / 10", size: types_1.productSizeType.SMALL },
    { id: 6, name: "f", url: "127", price: 600, description: "여섯번째 제품", rating: "9.2 / 10", size: types_1.productSizeType.MEDIUM }
];
exports.getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('products 뽑으러 들어옴');
    // res.json(products);
});
