import { Reducer } from "react";
import { ICollapsedPaths } from "../../interfaces/ICollapsedPaths";
import { ICollapsedPathAction } from "../actions/collapsed-path";

export const collapsedPaths: Reducer<ICollapsedPaths, ICollapsedPathAction> = (
    state = {},
    action
) => {
    switch (action.type) {
        case 'SET_COLLAPSED_PATH':
            const { path, childrenAreCollapsed } = action.payload;

            return {
                ...state,
                [path]: childrenAreCollapsed
            };
        default:
            return state;
    }
};