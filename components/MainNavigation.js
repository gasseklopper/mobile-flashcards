import React from 'react';
import { createBottomTabNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation'
import { blue, blueHighlight, white, red, gray } from '../utils/colors'
import { Platform } from 'react-native'
import DeckList from './DeckList'
import AddDeck from './AddDeck'
import IndividualDeck from './IndividualDeck'
import Quiz from './Quiz'

import { FontAwesome, Ionicons } from '@expo/vector-icons';

// added navigation from https://github.com/udacity/reactnd-UdaciFitness-complete/commit/9ff26370e4e5593195fdcad4d85e74f540a39220#commitcomment-33208226
const router = {
	DeckList: {
		screen: DeckList,
		navigationOptions: {
			tabBarLabel: 'DeckList',
		},
	},
	AddDeck: {
		screen: AddDeck,
		navigationOptions: {
			tabBarLabel: 'AddDeck',
		},
	}
}

const navigationOptions = {
	tabBarOptions: {
		showIcon: true,
		activeTintColor: Platform.OS === 'ios' ? gray : red,
		style: {
			padding: 10,
			height: Platform.OS === 'ios' ? 60 : 'auto',
			fontSize: 18,
			fontColor: red,
			backgroundColor: Platform.OS === 'ios' ? white : gray,
			shadowColor: 'rgba(0, 0, 0, 0.24)',
			shadowOffset: {
				width: 0,
				height: 3,
			},
			shadowRadius: 6,
			shadowOpacity: 1,
		},
	},
}

const MainNavigation =
	Platform.OS === 'ios'
	? createBottomTabNavigator(router, navigationOptions)
	: createMaterialTopTabNavigator(router, navigationOptions)

export default createAppContainer(MainNavigation)