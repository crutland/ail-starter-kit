import { combineReducers} from "redux";
import layout from "./layout";
import { ApplicationState } from "./";

const rootReducer = combineReducers<ApplicationState>({ layout });
export default rootReducer;