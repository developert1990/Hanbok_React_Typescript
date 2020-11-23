import { privateEncrypt } from 'crypto';
import express, { Request, Response, NextFunction, json } from 'express';
import Product from '../models/productsModel';
import { productsType } from '../types';
import jwt from 'jsonwebtoken';


interface decodeType {
    user_id: string;
}

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find({});
    res.send(products);
});

// 새로운 데이터 저장
router.post("/save", async (req: Request, res: Response, next: NextFunction) => {
    const { JWT_SECRET } = process.env;
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).json({
            status: 403,
            msg: 'not logged in'
        });
    }

    if (typeof token === "string" && typeof JWT_SECRET === "string") {
        // 프론트에서 로그인을 할때 받은 토큰을 이용해서 DB의 data를 작업할때 반드시 verify 를 통해 자격이 있는지 확인 후에 변경을 허락해야한다.
        jwt.verify(token, JWT_SECRET, async (err, decoded) => {
            console.log('err:__  ', err);
            console.log('decoded: __', decoded);
            if (err) {
                res.json({ name: err.name, message: err.message, status: 500 })
            } else {
                const { user_id } = decoded as decodeType;

                if (user_id === "magicq6265@gmail.com") {
                    const body: productsType = req.body;
                    const { name, image, price, size, stock, description, rating, numReviews } = body;
                    const product: productsType = new Product({
                        name: name,
                        image: image,
                        price: price,
                        stock: stock,
                        rating: rating,
                        size: size,
                        description: description,
                        numReviews: numReviews,
                    });
                    const newProduct = await product.save();
                    if (newProduct) {
                        res.send({ msg: "New Product Created", data: newProduct, status: 200 });
                    } else {
                        return res.status(500).send({ msg: "Error in Creating Product.", status: 401 })
                    }

                }
            }
        })
    }

});




router.put("/update/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { JWT_SECRET } = process.env;
    const token = req.headers['x-access-token'];
    console.log('id들어오는지', req.params);
    const productId = req.params.id;
    if (!token) {
        return res.status(403).json({
            status: 403,
            msg: 'Can not access with this token'
        });
    }

    if (typeof token === "string" && typeof JWT_SECRET === "string") {
        // 프론트에서 로그인을 할때 받은 토큰을 이용해서 DB의 data를 작업할때 반드시 verify 를 통해 자격이 있는지 확인 후에 변경을 허락해야한다.
        jwt.verify(token, JWT_SECRET, async (err, decoded) => {
            if (err) {
                res.json({ name: err.name, message: err.message, status: 500 })
            } else {
                const { user_id } = decoded as decodeType;

                if (user_id === "magicq6265@gmail.com") {
                    const body: productsType = req.body;
                    console.log('req.body:=====', req.body)
                    const { name, image, price, size, stock, description, rating, numReviews } = body;
                    const selectedProduct = await Product.findById(productId);

                    if (selectedProduct) {
                        selectedProduct.name = name;
                        selectedProduct.image = image;
                        selectedProduct.price = price;
                        selectedProduct.stock = stock;
                        selectedProduct.rating = rating;
                        selectedProduct.size = size;
                        selectedProduct.description = description;
                        selectedProduct.numReviews = numReviews;
                    }


                    const updaedProduct = await selectedProduct?.save();
                    if (updaedProduct) {
                        res.send({ msg: "Product Updated", data: updaedProduct, status: 200 });
                    } else {
                        return res.status(500).send({ msg: "Error in Creating Product.", status: 401 })
                    }

                }
            }
        })
    }

})

router.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    console.log('삭제하러 들어옴: ', req.headers['x-access-token'])
    const { JWT_SECRET } = process.env;
    const token = req.headers['x-access-token'];
    if (!token) {
        console.log('토큰 매치 안됨')
        return res.status(403).json({
            status: 403,
            msg: 'Can not access with this token'
        });
    }
    if (typeof token === "string" && typeof JWT_SECRET === "string") {
        jwt.verify(token, JWT_SECRET, async (err, decoded) => {
            if (err) {
                res.json({ name: err.name, message: err.message, status: 500 })
            } else {
                const { user_id } = decoded as decodeType;
                if (user_id === "magicq6265@gmail.com") {
                    const deletedProduct = await Product.findById(req.params.id);
                    if (deletedProduct) {
                        deletedProduct.remove();
                        res.send({ msg: "Product Updated", data: deletedProduct, status: 200 })
                    } else {
                        res.status(500).send({ msg: "Error in deleting Product.", status: 401 })
                    }
                }
            }
        })
    }

})

export default router;