import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import  {thunk} from 'redux-thunk';
import { reducer as appReducer } from './app/reducer';
import { reducer as authReducer } from './auth/reducer';

const rootReducer = combineReducers({  appReducer,authReducer });

 export const store = createStore(rootReducer, applyMiddleware(thunk));


