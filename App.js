import React from 'react';
import { View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import ReduxThunk from 'redux-thunk'
// import MainNavigation from './components/MainNavigation'
import APITest from './components/APITest'

const store = createStore(reducer, {}, applyMiddleware(ReduxThunk))

export default class App extends React.Component {
	componentDidMount() {
//basic setup
	}

	render() {
		return (
			<Provider store={store}>
				<View style={{flex: 1}}>
					<APITest/>
				</View>
			</Provider>
		)
	}
}