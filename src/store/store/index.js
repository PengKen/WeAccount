import AppReducer from "../reducers";
import createLogger from "redux-logger";
import {applyMiddleware, createStore} from "redux";
import {middleware} from "../../views/config";
import thunk from "redux-thunk";

const Store = createStore(AppReducer, applyMiddleware(middleware,thunk,createLogger));

export default Store