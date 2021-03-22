import { Action } from "redux";

export interface IFileContentAction extends Action<'SET_FILE_CONTENT'> {
    payload: Object;
}

export const setFileContent = (content: Object): IFileContentAction => ({
    type: 'SET_FILE_CONTENT',
    payload: content
});