
import { hanbokActionType, saveProductSuccessType, saveProductsFailedType } from '../types';
import { SAVE_HANBOK } from '../actions/actionTypes';
import { hanbokInitialStateType } from './productReducer';

export interface saveHanbokInitialType {
    data: saveProductSuccessType & saveProductsFailedType;
    isLoading: boolean;
    errorMessage?: string;
    success: boolean;
    action: string;
}

const saveHanbokInitialState: hanbokInitialStateType = {
    data: [],
    isLoading: false,
}

export const saveHanbokReducer = (state = saveHanbokInitialState, action: hanbokActionType) => {
    switch (action.type) {
        case `${SAVE_HANBOK}_PENDING`:
            return {
                ...state,
                isLoading: true,
            };
        case `${SAVE_HANBOK}_FULFILLED`:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                success: true,
                action: action.type,
            }
        case `${SAVE_HANBOK}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            }

        default:
            return state;
    }
}

