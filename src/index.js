import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import App from './components/app'
import reducers from './reducers'
import reduxThunk from 'redux-thunk'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import GameView from './components/views/GameView'

import StartMenu from './components/views/StartMenu'
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)
ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={StartMenu}/>
				<Route path="gameView" component={GameView} />
			</Route>
		</Router>
	</Provider>
, document.querySelector('.container'))
