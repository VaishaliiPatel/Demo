import { createStore, applyMiddleware ,Store} from "redux";
import userReucer from "./AddUser/reducer";
import { createLogger } from "redux-logger";
import CreateSagaMiddleware from 'redux-saga';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import * as storage from 'redux-storage';


import thunk from "redux-thunk";
import { USER } from "./AddUser/types";
const loggerMiddleware = createLogger();
const sagaMiddleware = CreateSagaMiddleware();

// const engine = createEngine('DemoApp');

export const store = createStore(userReucer, applyMiddleware(loggerMiddleware, sagaMiddleware));
// const storageMiddleware = storage.createMiddleware(engine, [], [
//     USER.ADD_USER
// ]);
// export default function configureStore(): Store<any, any> {
//     const sagaMiddleware = CreateSagaMiddleware();
//     const store = createStore(userReucer, applyMiddleware(sagaMiddleware, storageMiddleware, loggerMiddleware));
//     // sagaMiddleware.run(rootSaga);
//     const load = storage.createLoader(engine);
//     load(store);
//     return store;
// }
