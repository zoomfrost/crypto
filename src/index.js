import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';

import store from './store/index';

import {BrowserRouter as Router} from 'react-router-dom';
import 'antd/dist/antd.css';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Provider store={store}>
                <App />
            </Provider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

