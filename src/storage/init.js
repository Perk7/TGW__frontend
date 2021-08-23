import {rootReducer} from "./rootReducer";
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist' // imports from redux-persist
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {loadState, saveState} from "./localStorage";

const persistConfig = {
    key: 'root',
    storage,
}

const persistedState = loadState()
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(persistedReducer, persistedState)
    store.subscribe(() => {
        saveState(
            store.getState()
        );
    });
    let persistor = persistStore(store)
    return { store, persistor }
}