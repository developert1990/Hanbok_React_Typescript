import { productSizeType, productType, hanbokActionType } from '../types';
import { GET_HANBOK } from '../actions/actionTypes';


export interface hanbokInitialStateType {
    data: productType[];
    isLoading: boolean;
    success?: boolean,
}

const hanbokInitialState: hanbokInitialStateType = {
    data: [],
    isLoading: false,
}

export const hanbokReducer = (state = hanbokInitialState, action: hanbokActionType) => {
    switch (action.type) {
        case `${GET_HANBOK}_PENDING`:
            return {
                ...state,
                isLoading: true,
                success: false,
            };
        case `${GET_HANBOK}_FULFILLED`:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                success: true,
                action: action.type
            }
        case `${GET_HANBOK}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
                success: false,
            }

        default:
            return state;
    }
}