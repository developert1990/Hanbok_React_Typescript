
import { Document } from 'mongoose';

// declare module 'types' {

export interface productsType extends Document {
    name: string;
    image: string;
    price: number;
    stock: number;
    description: string;
    size: productSizeType;
    rating: number;
    numReviews: number;
}

export interface userType extends Document {
    id: number;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    token: () => void;
}



export enum productSizeType {
    SMALL = "SAMLL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE",
}

// }