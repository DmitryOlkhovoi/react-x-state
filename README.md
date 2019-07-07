# ![xPorn - state managment (logo)](https://github.com/xmars-open-source/xporn/blob/master/logo_black.png)

#### Redux-like state management for any kind of app written using React.js. Easy to setup, use and scale.

xPorn is designed specifically for React. This is why using this library is easier. It has synchronous and asynchronous actions right out of the box.

See Roadmap for understanding further plans.

## Getting Started
All you need is ~~your right hand~~

### Installing
xPorn is available as a package on NPM:
```
npm i xporn
```

### Basic Example
In this first version of the documentation, I'm assuming you are already familiar with React and Redux.

As you do with Redux or any other state management library, firstly you should wrap your application with Provider:

```jsx
// ...

function App() {
  return (
    <Provider>
      <div className="App" />
    </Provider>
  );
}

// ...
```
Initial state for your application can be any JavaScript Object. That object will be passed to your reducer. Reducer is the same thing as in Redux:

```jsx
const initialState = {
  headline: "Hello World"
};

function reducer(state, action) {
  switch (action.type) {
    case "change headline": {
      return {
        ...state,
        headline: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

function App() {
  return (
    <Provider initialState={initialState} reducer={reducer}>
      <div className="App" />
    </Provider>
  );
}
```

Let's make a new component for the headline and another one to change it.

```jsx
import React from "react";
import { useGlobalState } from "xporn";

export default () => {
  const { headline } = useGlobalState();

  return <h1>{headline}</h1>;
};
```

As you can see to access the state of the application all you need is useGlobalState Hook.

The same with Dispatcher, Mutations, Actions etc:

```jsx
import React from "react";
import { useDispatch, useGlobalState } from "xporn";

export default () => {
  const { headline } = useGlobalState();
  const dispatch = useDispatch();

  return (
    <input
      onChange={e => {
        dispatch({
          type: "change headline",
          payload: e.currentTarget.value
        });
      }}
      value={headline}
    />
  );
};
```

Try out this example: 

[![Edit pedantic-cookies-p4gjk](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/pedantic-cookies-p4gjk?fontsize=14)

## Main Parts
TODO Example

### State
### Dispath
### Mutations
### Actions

## Roadmap
### Combing Reducers
### Selectors
TODO
### Middlewares
TODO

## Contribution
TODO

## Related Articles
TODO
