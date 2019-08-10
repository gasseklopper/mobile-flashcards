import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { white, red, darkgray } from '../utils/colors'
import { connect } from 'react-redux'

const Deck = (props) => {
	const { deck } = props

	if (deck === undefined) {
		return <View style={styles.deckWrapper} />
	}
	return (
		<View style={styles.deckWrapper}>
			<View>
				<Text style={styles.deckTitle}>{deck.title}</Text>
			</View>
			<View>
				<Text style={styles.cardsText}>{deck.questions.length} {deck.questions.length < 1 ? <Text> Cards</Text> : deck.questions.length > 1 ? <Text> Cards</Text> : <Text> Card</Text>}</Text>
			</View>
		</View>
	)
}


const styles = StyleSheet.create({
	deckWrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: 90,
		borderWidth: 1,
		borderColor: darkgray,
		backgroundColor: white,
		borderRadius: 5,
		marginBottom: 20
	},
	deckTitle: {
		fontSize: 28
	},
	cardsText: {
		fontSize: 18,
		color: darkgray
	}
})

const mapStateToProps = (state, { id }) => {
	const deck = state[id];
	return {
		deck
	}
}

export default connect(mapStateToProps)(Deck)