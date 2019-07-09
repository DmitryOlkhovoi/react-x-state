# ![xPorn - state managment (logo)](https://github.com/xmars-open-source/xporn/blob/master/git_logo.png)
![](https://travis-ci.com/xmars-open-source/xporn.svg?branch=master)

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
#### This is a very basic example. To see more structured and documented example take a look at ./example
In this first version of the documentation, I'm assuming you are already familiar with React and Redux.
As you do with Redux or any other state management library, firstly you should wrap your application with Provider.
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
       <div className="App">
        <Headline />
        <HeadlineChanger />
      </div>
    </Provider>
  );
}
```

Let's make a new component for the headline and another one to change it.

#### Headline.jsx
```jsx
import React from "react";
import { useGlobalState } from "xporn";

export default () => {
  const { headline } = useGlobalState();

  return <h1>{headline}</h1>;
};
```

To access the state of the application all you need is useGlobalState Hook.

The same with Dispatcher, Mutations, Actions etc:

#### HeadlineChanger.jsx
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

useDispatch is a very low level functional. To improve your codebase you could use Mutations and Actions. Mutations is synchronous commits to state of an application. Actions are asynchronous and can dispatch several Mutations within themselves.

```js
// ...

const mutations = {
  changeHeadline(newHeadline) {
    return {
      type: "change headline",
      payload: newHeadline
    };
  }
};

// ...

<Provider
    initialState={initialState}
    reducer={reducer}
    mutations={mutations}
  >
    <div className="App">
      <Headline />
      <HeadlineChanger />
    </div>
</Provider>

// ...
```

And let's update our `HeadlineChanger.jsx`:

```jsx
import React from "react";
import { useGlobalState, useMutations } from "xporn";

export default () => {
  const { headline } = useGlobalState();
  const { changeHeadline } = useMutations();

  return (
    <input
      onChange={e => {
        changeHeadline(e.currentTarget.value);
      }}
      value={headline}
    />
  );
};
```

Try out this example: 

[![Edit pedantic-cookies-p4gjk](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/pedantic-cookies-p4gjk?fontsize=14)

## Core Concepts
TODO write doc
### State
### Dispath
### Mutations
### Actions

## Typescript
TODO write doc

## Roadmap
### Combing Reducers
TODO
### Selectors
TODO
### Middlewares
TODO
### DevTools
TODO

## Contribution
TODO

## Related Articles
TODO
