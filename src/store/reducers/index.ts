import { combineReducers } from "redux";
import { rows } from "./row";
import { collapsedPaths } from "./collapsed-path";
import { fileContent } from "./file-content";
import { queriedPaths } from "./queried-path";

const rootReducer = combineReducers({
    rows,
    fileContent,
    queriedPaths,
    collapsedPaths
});

export default rootReducer;
