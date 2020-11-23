
// declare module 'types' {

import { loginInitialStateType } from './reducers/loginReducer';
import { hanbokInitialStateType } from './reducers/productReducer';
import { registerInitialStateType } from './reducers/signupReducer';


export interface saveProductSuccessType {
    data?: productType;
    msg: string;
    status: number;
}

export interface saveProductsFailedType {
    name: string;
    expiredAt?: string;
    message?: string;
    _id?: number;
    image?: string;
    stock?: number;
    price?: number;
    description?: string;
    rating?: number;
    size?: productSizeType | string;
}


export interface registerType {
    name: string;
    email: string;
    password: string;
}

export interface userInputType {
    email: string;
    password: string;
}

export interface emailType {
    email: string;
}

export interface passwordType {
    password: string;
}

export interface productType {
    _id?: number;
    name: string;
    image: string;
    stock: number;
    price: number;
    description: string;
    rating: number;
    size: productSizeType | string;
}

export enum productSizeType {
    SMALL = "SAMLL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE",
}

export interface hanbokActionType {
    type: string;
    payload: hanbokInitialStateType;
}

export interface loginActionType {
    type: string;
    payload: loginInitialStateType;
}

export interface registerActionType {
    type: string;
    payload: registerInitialStateType;
}

// }