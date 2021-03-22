import IRow from "./IRow";
import { ICollapsedPaths } from "./ICollapsedPaths";
import { IQueriedPaths } from "./IQueriedPaths";

export interface IAppState {
    rows: Array<IRow>;
    fileContent: Object;
    collapsedPaths: ICollapsedPaths;
    queriedPaths: IQueriedPaths;
}