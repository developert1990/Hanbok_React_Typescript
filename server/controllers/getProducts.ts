import { productSizeType, productsType, productType } from '../types';
import express, { Request, Response, NextFunction } from 'express';

const app = express();
app.use(express.json());

const products: productType[] = [
    { id: 1, name: "a", image: "123", price: 100, description: "첫번째 제품", rating: 7.8, size: productSizeType.LARGE, stock: 10 },
    { id: 2, name: "b", image: "122", price: 200, description: "두번째 제품", rating: 8.8, size: productSizeType.MEDIUM, stock: 10 },
    { id: 3, name: "c", image: "124", price: 300, description: "세번째 제품", rating: 9.8, size: productSizeType.SMALL, stock: 10 },
    { id: 4, name: "d", image: "125", price: 400, description: "네번째 제품", rating: 6.8, size: productSizeType.LARGE, stock: 10 },
    { id: 5, name: "e", image: "126", price: 500, description: "다섯번째 제품", rating: 10, size: productSizeType.SMALL, stock: 10 },
    { id: 6, name: "f", image: "127", price: 600, description: "여섯번째 제품", rating: 9.2, size: productSizeType.MEDIUM, stock: 10 }
]


export const getHanboks = async (req: Request, res: Response) => {
    console.log('products 뽑으러 들어옴');
    res.json(products)
    // res.json(products);
}