import { deleteHanbokInitialType, deleteHanbokReducer } from './deleteProductReducer';
import { saveHanbokInitialType, saveHanbokReducer } from './saveProductReducer';
import { hanbokInitialStateType, hanbokReducer } from './productReducer';
import { loginInitialStateType, loginReducer } from './loginReducer';
import { registerInitialStateType, registerReducer } from './signupReducer';
import { combineReducers } from 'redux';


export interface initialAppStateType {
    hanbokStore: hanbokInitialStateType;
    loginStore: loginInitialStateType;
    registerStore: registerInitialStateType;
    saveHanbokStore: saveHanbokInitialType,
    deleteHanbokStore: deleteHanbokInitialType,
}


export default combineReducers({
    hanbokStore: hanbokReducer,
    loginStore: loginReducer,
    registerStore: registerReducer,
    saveHanbokStore: saveHanbokReducer,
    deleteHanbokStore: deleteHanbokReducer,
})