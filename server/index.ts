import * as controllers from './controllers/getProducts';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import config from './config/config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';

dotenv.config();
const { MONGODB_URL } = process.env;

if (typeof MONGODB_URL === "string") {
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).catch(error => console.log(error.reason))
}

const PORT = 9090;
const app = express();
app.use(cors());
app.use(express.json());


app.use('/users', userRoute);
app.use('/products', productRoute);

app.get('/', () => {
    console.log('연결됨')
});
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at ${PORT}`);
});

// app.get('/products', controllers.getHanboks);

