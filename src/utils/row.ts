import IRow from "../interfaces/IRow";
import { isEmpty } from "./object";

export const getRowsFromJson = (
    entity: any,
    rows: Array<IRow>,
    depth: number,
    path: string,
    parentIsArray = false
) => {

    const row = {
        depth
    } as IRow;

    if (Array.isArray(entity)) {
        // Enter here if it is an Anonymous array 

        for (let i = 0; i < entity.length; i++) {

            const newPath = `${path}[${i}]`;

            getRowsFromJson(entity[i], rows, depth, newPath, true);
        }
    } else if (typeof entity === 'object' && entity !== null && entity !== undefined) {

        ++depth;

        // Count the number of key value pairs so we can put a handle...
        // ...on the first key value pair for anonymous objects inside arrays
        const keys = Object.keys(entity);
        const keysLength = keys.length;

        keys.forEach((key, i) => {
            const value = entity[key];

            if (Array.isArray(value)) {
                // Enter here if it is a named array e.g category: [...]

                const newPath = `${path}['${key}']`;

                rows.push({
                    ...row,
                    type: 'array',
                    keyValue: {
                        value: key
                    },
                    path: newPath
                });

                getRowsFromJson(value, rows, depth, newPath);
            } else if (typeof (value) === 'object' && value !== null && value !== undefined) {
                // Enter here if the object is a child of an object e.g owner in:=> shop: { owner: {}}
                const newPath = `${path}['${key}']`;

                rows.push({
                    ...row,
                    type: isEmpty(value)
                        ? 'emptyObject'
                        : 'object',
                    keyValue: {
                        value: key
                    },
                    path: newPath
                });

                getRowsFromJson(value, rows, depth, newPath);
            } else {
                // Enter here if entity is not object or array i.e for keyValue pairs 
                // e.g "category: fiction"

                // only show anonymous object handle if this is the first object child to be rendered
                if (parentIsArray && i === 0) {

                    rows.push({
                        ...row,
                        type: 'anonymousObject',
                        keyValue: {
                            key,
                            value
                        },
                        path
                    });
                }

                rows.push({
                    ...row,
                    type: 'keyValue',
                    keyValue: {
                        key,
                        value
                    },
                    path: `${path}['${key}']`
                });

                ++i;
            }
        });

    } else {
        // Enter here if entity is primitive type content in an array e.g ["boy", "girl"]

        rows.push({
            ...row,
            type: 'primitive',
            keyValue: {
                value: `${entity}`
            },
            path
        });
    }

    return rows;
};
