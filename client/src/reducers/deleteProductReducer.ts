import { DELETE_HANBOK } from './../actions/actionTypes';
import { hanbokActionType, saveProductSuccessType, saveProductsFailedType } from './../types';
import { hanbokInitialStateType } from './productReducer';


export interface deleteHanbokInitialType {
    data: saveProductSuccessType & saveProductsFailedType;
    isLoading: boolean;
    errorMessage?: string;
    success: boolean
}

const deleteHanbokInitialState: hanbokInitialStateType = {
    data: [],
    isLoading: false,
    success: false,
}

export const deleteHanbokReducer = (state = deleteHanbokInitialState, action: hanbokActionType) => {
    switch (action.type) {
        case `${DELETE_HANBOK}_PENDING`:
            return {
                ...state,
                isLoading: true,
            };
        case `${DELETE_HANBOK}_FULFILLED`:
            return {
                ...state,
                data: action.payload,
                isLoading: false
            };
        case `${DELETE_HANBOK}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            }
        default:
            return state;
    }
}