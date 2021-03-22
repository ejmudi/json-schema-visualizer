import React, { useState, useRef } from 'react';
import { JSONPath } from 'jsonpath-plus';
import { connect } from "react-redux";
import { IAppState } from '../interfaces/IAppState';
import IRow from '../interfaces/IRow';
import { setRows } from '../store/actions/row';
import { setFileContent } from '../store/actions/file-content';
import { setCollapsedPath } from '../store/actions/collapsed-path';
import { getRowsFromJson } from '../utils/row';
import { ICollapsedPaths } from '../interfaces/ICollapsedPaths';
import Row from './row';
import { IQueriedPaths } from '../interfaces/IQueriedPaths';
import { setQueriedPaths } from '../store/actions/queried-path';
import 'react-virtualized/styles.css';
import { AutoSizer, List, CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import debounce from 'lodash.debounce';
import './index.scss';
import { getVisibleRows } from '../selectors';
import { sampleJSON } from '../utils/constants';

interface IStateProps {
    visibleRows: Array<IRow>;
    fileContent: Object;
    queriedPaths: IQueriedPaths;
    collapsedPaths: ICollapsedPaths;
}

interface IDispatchProps {
    setRows: typeof setRows;
    setFileContent: typeof setFileContent;
    setQueriedPaths: typeof setQueriedPaths;
    setCollapsedPath: typeof setCollapsedPath;
}

interface IProps extends IStateProps, IDispatchProps { }

const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 35
});

const Visualizer: React.FC<IProps> = props => {

    const {
        visibleRows,
        fileContent,
        queriedPaths,
        collapsedPaths,
        setRows,
        setFileContent,
        setQueriedPaths,
        setCollapsedPath
    } = props;

    const [isOnUploadScreen, setIsOnUploadScreen] = useState(true);
    const [fileStringContent, setFileStringContent] = useState(sampleJSON);
    const input = useRef<HTMLInputElement>(null);

    const queryPaths = debounce((query, fileContent) => {
        const queriedPaths: IQueriedPaths = {};

        JSONPath<Array<string>>({
            path: query,
            json: fileContent,
            resultType: 'path'
        }).forEach(path => {
            queriedPaths[path] = true;
        });

        setQueriedPaths(queriedPaths);

    }, 1000);

    const handleQueryChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const query = input.current?.value || '';
        queryPaths(query, fileContent);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0);

        if (file) {
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = evt => {
                const content = evt.target?.result as string;
                setFileStringContent(content);
            }
        }
    };

    const handleVisualize = () => {
        if (fileStringContent === '') {
            alert('Please upload a JSON file or fill the form with JSON!');
            return;
        }

        let json = {};
        try {
            json = JSON.parse(fileStringContent);
        } catch (error) {
            alert('Your JSON content is probably Invalid, Please check your JSON and then try again');
            return;
        }

        setFileContent(json);
        setRows(getRowsFromJson(json, [], 0, '$'));

        setIsOnUploadScreen(false);
    };

    return (
        <div className='visualizer'>
            <h2 className='title'><a href='/'>JSON Schema Visualizer</a></h2>
            {isOnUploadScreen && (
                <>
                    <p className='subtitle'>Either upload a JSON file or replace the textarea sample content with your own JSON</p>
                    <div className='form-wrapper'>
                        <div>
                            <input id='file' type='file' onChange={handleFileChange} />
                            <label htmlFor='file'>
                                <img src={'https://www.vippng.com/png/detail/205-2054407_folder-icon-vector-png.png'} alt='folder' />
                                <p>Click here to upload your JSON file</p>
                            </label>
                        </div>
                        <div>
                            <textarea placeholder='Enter JSON content here' value={fileStringContent} onChange={e => setFileStringContent(e.target.value)} />
                        </div>
                    </div>
                    <hr />
                    <div className='button-wrapper'>
                        <button onClick={handleVisualize}>Visualize JSON</button>
                    </div>
                </>
            )}
            {!isOnUploadScreen && (
                <div className='visualizer-screen'>
                    <div className='instructions'>
                        <p>
                            If you're using the Sample JSON from the previous page, Try typing this JSONPath Query in the input: <span className='query-sample'>$.owner.options[0]</span>
                        </p>
                        <p>
                            Not familiar with JSONPath? read about it here: <a href='https://restfulapi.net/json-jsonpath/' target='_blank' rel='noopener noreferrer'>https://restfulapi.net/json-jsonpath/</a>
                        </p>
                    </div>
                    <div className='input-wrapper'>
                        <input
                            ref={input}
                            placeholder='Enter JSONPath query here'
                            onKeyUp={handleQueryChange}
                        />
                    </div>
                    <AutoSizer>
                        {({ width }) => (
                            <List
                                height={window.innerHeight - 161}
                                width={width}
                                rowCount={visibleRows.length}
                                deferredMeasurementCache={cache}
                                rowHeight={cache.rowHeight}
                                rowRenderer={({ key, index, parent, style }) => (
                                    <CellMeasurer
                                        key={key}
                                        cache={cache}
                                        parent={parent}
                                        columnIndex={0}
                                        rowIndex={index}
                                    >
                                        <div style={style}>
                                            <Row
                                                row={visibleRows[index]}
                                                queriedPaths={queriedPaths}
                                                collapsedPaths={collapsedPaths}
                                                setCollapsedPath={setCollapsedPath}
                                            />
                                        </div>
                                    </CellMeasurer>
                                )}
                            />
                        )}
                    </AutoSizer>
                </div>
            )}
        </div>
    );
}

const mapStateToProps = (state: IAppState): IStateProps => {
    return {
        visibleRows: getVisibleRows(state),
        fileContent: state.fileContent,
        queriedPaths: state.queriedPaths,
        collapsedPaths: state.collapsedPaths
    }
};

const mapDispatchToProps: IDispatchProps = {
    setRows,
    setFileContent,
    setQueriedPaths,
    setCollapsedPath
};

export default connect(mapStateToProps, mapDispatchToProps)(Visualizer);