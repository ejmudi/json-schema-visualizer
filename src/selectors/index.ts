import { createSelector } from 'reselect'
import { IAppState } from '../interfaces/IAppState'

const getRows = (state: IAppState) => state.rows;
const getCollapsedPaths = (state: IAppState) => state.collapsedPaths;

export const getVisibleRows = createSelector(
  [ getRows, getCollapsedPaths ],
  (rows, collapsedPaths) => {
    
    const parentPaths = Object.keys(collapsedPaths).filter(path => collapsedPaths[path])

    const visibleRows = rows.filter(row => {
        if (parentPaths.some(path =>
            row.path.startsWith(path)
            && row.path !== path
        )
        ) {
            return false;
        }
        return true;
    });

    return visibleRows;
  }
)