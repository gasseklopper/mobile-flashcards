import React from 'react'
import { Platform } from 'react-native'
import * as Icon from '@expo/vector-icons'
import { createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import DeckList from '../components/DeckList'
import AddDeck from '../components/AddDeck'
import APITest from '../components/APITest'
import DeckDetail from '../components/DeckDetail'
import AddCard from '../components/AddCard'
import Quiz from '../components/Quiz'

import { gray, white, red } from '../utils/colors'

const isIOS = Platform.OS === 'ios' ? true : false;

const routeConfigs = {
	Decks: {
		screen: DeckList,
		navigationOptions: {
			tabBarLabel: 'Decks',
			tabBarIcon: ({ tintColor }) => (
				<Icon.Ionicons
					name={isIOS ? 'ios-bookmarks' : 'md-bookmarks'}
					size={30}
					color={tintColor}
				/>
			)
		}
	},
	AddDeck: {
		screen: AddDeck,
		navigationOptions: {
			tabBarLabel: 'Add Deck',
			tabBarIcon: ({ tintColor }) => (
				<Icon.FontAwesome name="plus-square" size={30} color={tintColor} />
			)
		}
	},
	ApiTest: {
		screen: APITest,
		navigationOptions: {
			tabBarLabel: 'APITest',
			tabBarIcon: ({ tintColor }) => (
				<Icon.FontAwesome name="check" size={30} color={tintColor} />
			)
		}
	}
}



const tabNavigatorConfig = {
	navigationOptions: {
		header: null
	},
	defaultNavigationOptions: {
		bounces: true
	},
	tabBarOptions: {
		activeTintColor: red,
		style: {
			height: 60,
			backgroundColor: white,
			shadowColor: 'rgba(0,0,0, 0.24)',
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowRadius: 6,
			shadowOpacity: 1,
			borderTopWidth: 1,
			borderTopColor: gray
		},
		labelStyle: {
			fontSize: 12,
			fontWeight: 'bold'
		},
		tabStyle: {
			marginTop: 5,
			marginBottom: 3
		},
		showIcon: true
	}
}

const Tabs = createBottomTabNavigator(routeConfigs, tabNavigatorConfig);

const MainNavigator = createStackNavigator(
	{
		Home: {
			screen: Tabs
		},
		DeckDetail: {
			screen: DeckDetail,
			navigationOptions: {
				headerTintColor: red,
				headerStyle: {
					backgroundColor: gray
				},
				title: 'Deck Details'
			}
		},
		AddCard: {
			screen: AddCard,
			navigationOptions: {
				headerTintColor: red,
				headerStyle: {
					backgroundColor: gray
				},
				headerTitleStyle: {
					justifyContent: 'center',
					textAlign: 'center'
				},
				title: 'Add Card'
			}
		},
		Quiz: {
			screen: Quiz,
			navigationOptions: {
				headerTintColor: red,
				headerStyle: {
					backgroundColor: gray
				},
			}
		}
	},
	{ headerLayoutPreset: 'center' }
)

export default MainNavigator
