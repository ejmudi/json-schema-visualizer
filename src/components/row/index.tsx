import React from 'react';
import IRow from '../../interfaces/IRow';
import { ICollapsedPaths } from '../../interfaces/ICollapsedPaths';
import './index.scss';
import { setCollapsedPath } from '../../store/actions/collapsed-path';
import { IQueriedPaths } from '../../interfaces/IQueriedPaths';

interface IProps {
    row: IRow;
    collapsedPaths: ICollapsedPaths;
    queriedPaths: IQueriedPaths;
    setCollapsedPath: typeof setCollapsedPath;
}

const Row: React.FC<IProps> = props => {
    const {
        row,
        queriedPaths,
        collapsedPaths,
        setCollapsedPath
    } = props;

    let childrenAreCollapsed = false;
    for (const path in collapsedPaths) {
        if (row.path === path) {
            childrenAreCollapsed = collapsedPaths[path];
            break;
        }
    }

    const getCollapsedValue = (value: string | number | boolean, childrenAreCollapsed: boolean) => {

        if (childrenAreCollapsed) {
            if (row.type === 'array') {
                return `[ ${value} ... ]`;
            } else if (row.type === 'object') {
                return (
                    <>
                        {'{ '}{value}{' ... }'}
                    </>
                )
            } else if (row.type === 'anonymousObject') {
                return (
                    <>
                        {'{ '}{value}{', ... }'}
                    </>
                )
            }
        }

        return value;
    }

    const renderValue = (
        row: IRow,
        childrenAreCollapsed: boolean
    ) => {

        const {
            type,
            keyValue: {
                key,
                value
            }
        } = row;

        let newKey: string | undefined;
        let newValue: string | number | boolean | JSX.Element;

        let isQueried = false;
        for (const path in queriedPaths) {
            if ((row.type === 'object' || row.type === 'emptyObject' || row.type === 'array')
                && row.path.startsWith(`${path}[`)) {
                isQueried = true;
                break;
            } else if (row.path.startsWith(`${path}`)) {
                isQueried = true;
                break;
            }
        }

        if (type === 'keyValue') {
            newKey = `${key}:`;
            newValue = value;
        } else if (type === 'anonymousObject') {

            if (childrenAreCollapsed) {

                if (typeof value === 'string') {
                    newKey = `${key}:`
                    newValue = value.substring(0, 9);
                } else {
                    newKey = `${key}:`;
                    newValue = value;
                }

            } else {
                newKey = ''
                newValue = '';
            }

        } else {
            newKey = '';
            newValue = value;
        }

        newValue = getCollapsedValue(newValue, childrenAreCollapsed);

        return (
            <div className={`text-content ${isQueried ? 'is-queried' : ''}`}>
                <div>{newKey}</div>
                <div>{newValue}</div>
            </div>
        );
    };

    const hasHandle = row.type === 'object'
    || row.type === 'emptyObject'
    || row.type === 'array'
    || row.type === 'anonymousObject';

    const handleIsClickable = row.type !== 'emptyObject';

    return (
        <div className='row'>
            <div
                className={`content ${hasHandle ? 'has-handle' : ''}`}
                style={{
                    paddingLeft: `${20 * row.depth}px`
                }}>
                <div className='handle-wrapper'>
                    <div
                        className={`handle ${handleIsClickable ? '' : 'unclickable'} ${childrenAreCollapsed ? 'plus' : 'minus'}`
                        }
                        onClick={e => handleIsClickable && setCollapsedPath(row.path, !childrenAreCollapsed)}
                    />
                </div>
                {
                    renderValue(row, childrenAreCollapsed)
                }
            </div>
        </div>

    );
};


export default Row;