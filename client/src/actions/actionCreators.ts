
import { GET_HANBOK, FETCH_LOGIN, FETCH_REGISTER, SAVE_HANBOK, DELETE_HANBOK } from './actionTypes';
import { userInputType, registerType, productType } from '../types';
import Cookie from 'js-cookie';
import { Action } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { hanbokInitialStateType } from '../reducers/productReducer';

// 모든 hanbok product 가져옴
export const fetchProductsList = () => {
    return {
        type: GET_HANBOK,
        payload: new Promise(async (resolve, rejects) => {
            try {
                const response = await fetch('http://localhost:9090/products');
                const data = await response.json();
                // console.log('data: ', data);
                Cookie.set('products', JSON.stringify(data));
                resolve(data);
            } catch (error) {
                rejects(error.message);
            }
        })
    }
}

// hanbok 삭제

export const fetchDeleteHanbokThunk = (product: productType): ThunkAction<any, void, null, Action> => dispatch => {
    const cookie = Cookie.getJSON("userInfo");
    const token = cookie.token;
    console.log('삭제할 데이터: ', product);
    const response = dispatch({
        type: DELETE_HANBOK,
        payload: new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`http://localhost:9090/products/delete/${product._id}`, {
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token },
                    method: 'DELETE',
                });
                const data = await response.json();
                resolve(data);
            } catch (error) {
                reject(error.message);
            }
        })
    });

    // @ts-ignore
    response.then((data) => {
        console.log('리스트 뽑으러 온다', data)
        dispatch(fetchProductsList())
    })
}

export const fetchSaveHanbokThunk = (product: productType): ThunkAction<any, any, any, Action> => dispatch => {
    const cookie = Cookie.getJSON("userInfo");
    const token = cookie.token;
    const hasID = product._id !== undefined;
    const response = dispatch({
        type: SAVE_HANBOK,
        payload: new Promise(async (resolve, reject) => {
            try {
                const url = `http://localhost:9090/products/${!hasID ? 'save' : `update/${product._id}`}`;
                const response = await fetch(url, {
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token },
                    method: !hasID ? "POST" : "PUT",
                    body: JSON.stringify(product),
                });
                const data = await response.json();
                // console.log('SaveHanbok data', data);
                resolve(data);
            } catch (error) {
                reject(error.message);
            }
        }),
    });

    // @ts-ignore
    response.then((data) => {
        console.log(data);
        dispatch(fetchProductsList());
    });
}









// login
export const fetchLogin = (userInput: userInputType | undefined) => {
    console.log('userInput', userInput)
    return {
        type: FETCH_LOGIN,
        payload: new Promise(async (resolve, rejects) => {
            try {
                const response = await fetch('http://localhost:9090/users/signin', {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify(userInput),
                });
                const data = await response.json();
                Cookie.set('userInfo', JSON.stringify(data));
                resolve(data);
            } catch (error) {
                rejects(error.message);
            }
        })
    }
}




// sign up 
export const fetchRegister = (registerInput: registerType | undefined) => {
    console.log('registerInput', registerInput)
    return {
        type: FETCH_REGISTER,
        payload: new Promise(async (resolve, rejects) => {
            try {
                const response = await fetch('http://localhost:9090/users/signup', {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify(registerInput),
                });
                const data = await response.json();
                resolve(data);
            } catch (error) {
                rejects(error.message)
            }
        })
    }
}

