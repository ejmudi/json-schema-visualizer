import IRow from "../../interfaces/IRow";
import { Action } from "redux";

export interface IRowAction extends Action<'SET_ROWS'> {
    payload: Array<IRow>;
}

export const setRows = (rows: Array<IRow>): IRowAction => ({
    type: 'SET_ROWS',
    payload: rows
});