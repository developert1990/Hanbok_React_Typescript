
import { FETCH_LOGIN } from '../actions/actionTypes';
import { loginActionType } from '../types';



export interface loginInitialStateType {
    loginInfo: Object;
    isLoading: boolean;
}

const loginInitialState: loginInitialStateType = {
    loginInfo: {},
    isLoading: false,
}

export const loginReducer = (state = loginInitialState, action: loginActionType) => {
    switch (action.type) {
        case `${FETCH_LOGIN}_PENDING`:
            return {
                ...state,
                isLoading: true,
            };
        case `${FETCH_LOGIN}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                loginInfo: action.payload,
            };
        case `${FETCH_LOGIN}_REJECTED`:

            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };
        default:
            return state;
    }
}