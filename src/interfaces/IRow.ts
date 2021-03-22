type RowType = 'primitive' | 'object' | 'array' | 'keyValue' | 'anonymousObject' | 'emptyObject';

interface IKeyValue {
    key?: string;
    value: string | number | boolean;
}

export default interface IRow {
    depth: number;
    type: RowType;
    keyValue: IKeyValue;
    path: string;
}