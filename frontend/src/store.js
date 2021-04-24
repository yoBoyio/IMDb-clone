import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';
//redux store props


const initialState = {};

const middleware = [thunk];

// const reducers = combineReducers({
//     authReducers: authReducers,
//     errorsReducers: dataReducer,
//     UI: uiReducer
// });


const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);


export default store;