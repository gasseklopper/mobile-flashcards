import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Deck from './Deck'
import TouchButton from './TouchButton'
import TextButton from './TextButton'
import { gray, darkgray, green, white } from '../utils/colors'
import { connect } from 'react-redux'

export class DeckDetail extends Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.deck !== undefined
	}

	render() {
		const { deck } = this.props
		return (
			<View style={styles.container}>
				<Deck id={deck.title} />
				<View>
					<TouchButton
						btnStyle={{ backgroundColor: white, borderColor: darkgray }}
						txtStyle={{ color: darkgray }}
						onPress={() =>
							this.props.navigation.navigate('AddCard', { title: deck.title })
						}>
						Add Card
					</TouchButton>

					<TouchButton
						btnStyle={{ backgroundColor: green, borderColor: white }}
						txtStyle={{ color: white }}
						onPress={() =>
							this.props.navigation.navigate('Quiz', { title: deck.title })
						}>
						Start Quiz
					</TouchButton>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		paddingTop: 20,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 20,
		backgroundColor: gray
	}
})

const mapStateToProps = (state, { navigation }) => {
	const title = navigation.getParam('title', 'undefined')
	const deck = state[title]
	return {
		deck
	}
}

export default connect(mapStateToProps)(DeckDetail)
