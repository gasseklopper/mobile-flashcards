import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import TouchButton from './TouchButton'
import { gray, green, red, white} from '../utils/colors'
import { connect } from 'react-redux'
import { addCardToDeck } from '../actions/index'
import { addCardToDeckAS } from '../utils/api'

export class AddCard extends Component {
	state = {
		question: '',
		answer: ''
	}

	handleQuestionChange = question => {
		this.setState({ question })
	}

	handleAnswerChange = answer => {
		this.setState({ answer })
	}

	handleSubmit = () => {
		const { addCardToDeck, title, navigation } = this.props
		const card = {
			question: this.state.question,
			answer: this.state.answer
		}

		addCardToDeck(title, card)
		addCardToDeckAS(title, card)

		this.setState({ question: '', answer: '' })
		navigation.goBack()
	}
	render() {
		return (
			<View style={styles.container}>
				<View>
					<View style={styles.block}>
						<Text style={styles.title}>Add a Card with:</Text>
					</View>
					<View style={[styles.block]}>
						<TextInput
							style={styles.input}
							value={this.state.question}
							onChangeText={this.handleQuestionChange}
							placeholder="Question"
							autoFocus={true}
							returnKeyType="next"
							onSubmitEditing={() => this.answerTextInput.focus()}
							blurOnSubmit={false}
						/>
					</View>
					<Text>and</Text>
					<View style={[styles.block]}>
						<TextInput
							style={styles.input}
							value={this.state.answer}
							onChangeText={this.handleAnswerChange}
							placeholder="Answer"
							ref={input => {
								this.answerTextInput = input
							}}
							returnKeyType="done"
							onSubmitEditing={this.handleSubmit}
						/>
					</View>
					<TouchButton
						btnStyle={{ backgroundColor: green, color: gray, borderColor: '#fff' }}
						onPress={this.handleSubmit}
						disabled={this.state.question === '' || this.state.answer === ''}>
						Submit
					</TouchButton>
				</View>
				<View style={{ height: '30%' }} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 0,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 20,
		backgroundColor: gray,
		justifyContent: 'space-around'
	},
	block: {
		marginBottom: 20
	},
	title: {
		textAlign: 'center',
		fontSize: 32
	},
	input: {
		borderWidth: 1,
		borderColor: 'gray',
		backgroundColor: '#fff',
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 5,
		fontSize: 20,
		height: 50
	}
})

const mapStateToProps = (state, { navigation }) => {
	const title = navigation.getParam('title', 'undefined')
	return {
		title
	}
}

export default connect(mapStateToProps, { addCardToDeck })(AddCard)
