import { Reducer } from "react";
import { IQueriedPaths } from "../../interfaces/IQueriedPaths";
import { IQueriedPathsAction } from "../actions/queried-path";

export const queriedPaths: Reducer<IQueriedPaths, IQueriedPathsAction> = (
    state = {},
    action
) => {
    switch (action.type) {
        case 'SET_QUERIED_PATHS':
            return action.payload;
        default:
            return state;
    }
};