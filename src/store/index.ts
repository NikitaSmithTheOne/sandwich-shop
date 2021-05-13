// *** NPM ***
import { createStore, compose, combineReducers } from 'redux';
import { throttle } from 'lodash';

// *** OTHER ***
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/local-storage';
import ingredientsReducer from './ingredients';
import ordersReducer from './orders';

// *** CONSTANTS ***
const LOCAL_STORAGE_REDUX_NAME = 'REDUX_INGREDIENTS';
const LOCAL_STORAGE_THROTTLE_TIME = 3000;

// *** REDUX STORE ***
const composeEnhancers =
    process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
        : compose;

// Combine reducers
const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    orders: ordersReducer,
});

const store = createStore(
    rootReducer,
    loadFromLocalStorage<StoreType>(LOCAL_STORAGE_REDUX_NAME),
    composeEnhancers(),
);

store.subscribe(
    throttle(() => {
        saveToLocalStorage(
            { ingredients: store.getState().ingredients, orders: store.getState().orders },
            LOCAL_STORAGE_REDUX_NAME,
        );
    }, LOCAL_STORAGE_THROTTLE_TIME),
);

export type StoreType = ReturnType<typeof rootReducer>;
export type StoreDispatchType = typeof store.dispatch;
export default store;
