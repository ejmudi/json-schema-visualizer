import { Reducer } from "react";
import IRow from "../../interfaces/IRow";
import { IRowAction } from "../actions/row";

export const rows: Reducer<Array<IRow>, IRowAction> = (
    state = [],
    action
) => {
    switch (action.type) {
        case 'SET_ROWS':
            return action.payload;
        default:
            return state;
    }
};