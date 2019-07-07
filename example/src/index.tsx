import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Provider from 'xporn';
import { any } from 'prop-types';

ReactDOM.render((
    <Provider initialState={{test: 'com'}} reducer={(...args) => {console.log(args); return {hey: 'lol'}}} mutations={[]} actions={{
        test(dis: any, value: any) {
            console.log('Fuck yeah', dis, value)
        }
    }}>
        <App />
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
