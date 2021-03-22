import { Action } from "redux";

export interface ICollapsedPathAction extends Action<'SET_COLLAPSED_PATH'> {
    payload: {
        path: string;
        childrenAreCollapsed: boolean;
    };
}

export const setCollapsedPath = (
    path: string,
    childrenAreCollapsed: boolean
): ICollapsedPathAction => ({
    type: 'SET_COLLAPSED_PATH',
    payload: {
        path,
        childrenAreCollapsed
    }
});