# json-visualizer
A Json schema visualizer using React, Redux, Webpack and Typescript.

# Demo
[https://determined-turing-bd8415.netlify.app/](https://determined-turing-bd8415.netlify.app/)

## Usage

```
npm install
```

```
npm start
```

A local server will be started at http://localhost:3000

## Performance optimization implementations:


1. I used objects instead of arrays as data types for potentially heavy lists data that needed to be saved in the redux store to reduce time complexity especially during state update.
2. The rows(IRow) data is only computed once throughout the application lifecycle and saved in state as opposed to state recomputation from the json content for every render.
3. I created separate objects(IQueriedPaths and ICollapsedPaths) to monitor and save state updates instead of constantly updating the rows(IRow) themselves which would be very expensive.
4. For cases where I needed to loop through object values, I used for..in loops instead of Object.keys which would have required looping twice(i.e first the keys and then their values).
5. I used Reselect selectors for memoization: Calculating the “visibleRows” could be potentially expensive for large datasets. So now the app only uses a cached value for visibleRows except when collapsedPaths are updated(i.e re-renders as a result of the user’s JSONPath queries will not cause a recalculation of “visibleRows”).
6. I used an uncontrolled input and refs to speed up user search queries as the JSONPATH() method blocks the DOM for very large datasets.
To further improve the user’s experience, I used debounce on the blocking JSONPATH() method to allow the user type freely without input blocks.
7. I used the react-virtualized library for windowing for long lists as advised in the official React docs [here](https://reactjs.org/docs/optimizing-performance.html#virtualize-long-lists).

## Author
Ejenavi Mudiaga.
