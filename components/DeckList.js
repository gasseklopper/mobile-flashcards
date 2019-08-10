import React, { Component } from 'react'
import { ScrollView,  View,  Text, StyleSheet,  TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Deck from './Deck'
import { gray, red } from '../utils/colors'
import { handleInitialData } from '../actions/index'

export class DeckList extends Component {
	componentDidMount() {
		this.props.handleInitialData()
	}

	render() {
		const { decks, navigation } = this.props
		return (
			<ScrollView style={styles.deckListContainer}>
				<Text style={styles.deckListTitle}>Flashcards</Text>
				{Object.values(decks).map(deck => {
					return (
						<TouchableOpacity
						key={deck.title}
						onPress={() =>
							navigation.navigate('DeckDetail', { title: deck.title })
						}>
							<Deck id={deck.title} />
						</TouchableOpacity>
					)
				})}
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	deckListContainer: {
		flex: 1,
		paddingTop: 20,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 20,
		backgroundColor: gray
	},
	deckListTitle: {
		fontSize: 40,
		textAlign: 'center',
		marginBottom: 16,
		color: red
}
})

const mapStateToProps = state => ({ decks: state })

export default connect(	mapStateToProps, { handleInitialData })(DeckList)