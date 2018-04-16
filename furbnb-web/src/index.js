import React from 'react';
import ReactDOM from 'react-dom';
import './resources/index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import frrbnbApp from './reducers/reducers';


const initialState = {
	accounts : {isHost:false}
};

const store = createStore(frrbnbApp, initialState)

const unsubscribe = store.subscribe(() =>
		  console.log(store.getState())
)

console.log(store.getState())

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>, document.getElementById('root'));
registerServiceWorker();

unsubscribe()
