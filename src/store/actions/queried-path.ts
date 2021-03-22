import { Action } from "redux";
import { IQueriedPaths } from "../../interfaces/IQueriedPaths";

export interface IQueriedPathsAction extends Action<'SET_QUERIED_PATHS'> {
    payload: IQueriedPaths;
}

export const setQueriedPaths = (paths: IQueriedPaths): IQueriedPathsAction => ({
    type: 'SET_QUERIED_PATHS',
    payload: paths
});