import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import reducer from './reducers/index'
import Constants from 'expo-constants'
import AppNavigator from './navigation/AppNavigator'


const store = createStore(
	reducer,
	applyMiddleware(thunk, logger)
)

function FlashcardStatusBar({ backgroundColor, ...props }) {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar backgroundColor={backgroundColor} {...props} />
		</View>
	)
}

export default class App extends React.Component {
	componentDidMount() {
		//basic setup
	}
	render() {
		return (
		<Provider store={store}>
			<View style={styles.container}>
				<FlashcardStatusBar
					backgroundColor="red"
					barStyle="light-content"
				/>
				<AppNavigator />
			</View>
		</Provider>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
})
