import { FETCH_REGISTER } from '../actions/actionTypes';
import { registerActionType } from '../types'

export interface registerInitialStateType {
    registerInfo: Object;
    isLoading: boolean;
}

const registerInitialState: registerInitialStateType = {
    registerInfo: {},
    isLoading: false,
}

export const registerReducer = (state = registerInitialState, action: registerActionType) => {
    switch (action.type) {
        case `${FETCH_REGISTER}_PENDING`:
            return {
                ...state,
                isLoading: true,
            };
        case `${FETCH_REGISTER}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                registerInfo: action.payload,
            };
        case `${FETCH_REGISTER}_REJECTED`:
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }
}