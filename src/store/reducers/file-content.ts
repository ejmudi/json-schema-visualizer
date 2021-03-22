import { Reducer } from "react";
import { IFileContentAction } from "../actions/file-content";

export const fileContent: Reducer<Object, IFileContentAction> = (
    state = new Object(),
    action
) => {
    switch (action.type) {
        case 'SET_FILE_CONTENT':
            return action.payload;
        default:
            return state;
    }
};