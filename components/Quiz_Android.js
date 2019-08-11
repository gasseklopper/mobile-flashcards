import React, { Component } from 'react'
import { View, Text, StyleSheet, ViewPagerAndroid } from 'react-native'
import TextButton from './TextButton'
import TouchButton from './TouchButton'
import { gray, green, red, textGray, darkGray, white } from '../utils/colors'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

const screen = {
	QUESTION: 'question',
	ANSWER: 'answer',
	RESULT: 'result'
}
const answer = {
	CORRECT: 'correct',
	INCORRECT: 'incorrect'
}

export class Quiz_Android extends Component {
	state = {
		show: screen.QUESTION,
		correct: 0,
		incorrect: 0,
		questionCount: this.props.deck.questions.length,
		answered: Array(this.props.deck.questions.length).fill(0)
	}

	handlePageChange = evt => {
		this.setState({
			show: screen.QUESTION
		})
	}

	handleAnswer = (response, page) => {
		if (response === answer.CORRECT) {
			this.setState(prevState => ({ correct: prevState.correct + 1 }))
		} else {
			this.setState(prevState => ({ incorrect: prevState.incorrect + 1 }))
		}
		this.setState(
			prevState => ({
				answered: prevState.answered.map((val, idx) => (page === idx ? 1 : val))
			}),
			() => {
				const { correct, incorrect, questionCount } = this.state

				if (questionCount === correct + incorrect) {
					this.setState({ show: screen.RESULT })
				} else {
					this.viewPager.setPage(page + 1)
					this.setState(prevState => ({
						show: screen.QUESTION
					}))
				}
			}
		)
	}

	handleReset = () => {
		this.setState(prevState => ({
			show: screen.QUESTION,
			correct: 0,
			incorrect: 0,
			answered: Array(prevState.questionCount).fill(0)
		}))
	}

	render() {
		const { questions } = this.props.deck
		const { show } = this.state

		if (questions.length === 0) {
			return (
				<View style={styles.pageStyle}>
					<View style={styles.block}>
						<Text style={[styles.count, { textAlign: 'center' }]}>
							You cannot take a quiz because there are no cards in the deck.
						</Text>
						<Text style={[styles.count, { textAlign: 'center' }]}>
							Please add some cards and try again.
						</Text>
					</View>
				</View>
			)
		}

		if (this.state.show === screen.RESULT) {
			const { correct, questionCount } = this.state
			const percent = ((correct / questionCount) * 100).toFixed(0)
			const resultStyle =
				percent >= 70 ? styles.resultTextGood : styles.resultTextBad

			return (
				<View style={styles.pageStyle}>
					<View style={styles.block}>
						<Text style={[styles.count, { textAlign: 'center' }]}>
							Quiz Complete!
						</Text>
						<Text style={resultStyle}>
							{correct} / {questionCount} correct
						</Text>
					</View>
					<View style={styles.block}>
						<Text style={[styles.count, { textAlign: 'center' }]}>
							Percentage correct
						</Text>
						<Text style={resultStyle}>{percent}%</Text>
					</View>
					<View>
						<TouchButton
							btnStyle={{ backgroundColor: green, borderColor: white }}
							onPress={this.handleReset}>
							Restart
						</TouchButton>
						<TouchButton
							btnStyle={{ backgroundColor: gray, borderColor: textGray }}
							txtStyle={{ color: textGray }}
							onPress={() => {
								this.handleReset()
								this.props.navigation.goBack()
							}}>
							Deck-Details
						</TouchButton>
						<TouchButton
							btnStyle={{ backgroundColor: gray, borderColor: textGray }}
							txtStyle={{ color: textGray }}
							onPress={() => {
								this.handleReset()
								this.props.navigation.navigate('Home')
							}}>
							Home
						</TouchButton>
					</View>
				</View>
			)
		}

		return (
			<ViewPagerAndroid
				style={styles.container}
				scrollEnabled={true}
				onPageSelected={this.handlePageChange}
				ref={viewPager => {
					this.viewPager = viewPager
				}}
			>
				{questions.map((question, idx) => (
					<View style={styles.pageStyle} key={idx}>
						<View style={styles.block}>
							<Text style={styles.count}>
								{idx + 1} / {questions.length}
							</Text>
						</View>
						<View style={[styles.block, styles.questionContainer]}>
							<Text style={styles.questionText}>
								{show === screen.QUESTION ? 'Question' : 'Answer'}
							</Text>
							<View style={styles.questionWrapper}>
								<Text style={styles.title}>
									{show === screen.QUESTION
										? question.question
										: question.answer}
								</Text>
							</View>
						</View>
						{show === screen.QUESTION ? (
							<TextButton
								txtStyle={{ color: red }}
								onPress={() => this.setState({ show: screen.ANSWER })}>
								Show Answer
							</TextButton>
						) : (
							<TextButton
								txtStyle={{ color: red }}
								onPress={() => this.setState({ show: screen.QUESTION })}>
								Show Question
							</TextButton>
						)}
						<View>
							<TouchButton
								btnStyle={{ backgroundColor: green, borderColor: white }}
								onPress={() => this.handleAnswer(answer.CORRECT, idx)}
								disabled={this.state.answered[idx] === 1}>
								Correct
							</TouchButton>
							<TouchButton
								btnStyle={{ backgroundColor: red, borderColor: white }}
								onPress={() => this.handleAnswer(answer.INCORRECT, idx)}
								disabled={this.state.answered[idx] === 1}>
								Incorrect
							</TouchButton>
						</View>
					</View>
				))}
			</ViewPagerAndroid>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	pageStyle: {
		flex: 1,
		paddingTop: 20,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 20,
		backgroundColor: gray,
		justifyContent: 'space-around'
	},
	block: {
		marginBottom: 20
	},
	count: {
		fontSize: 24
	},
	title: {
		fontSize: 32,
		textAlign: 'center'
	},
	questionContainer: {
		borderWidth: 1,
		borderColor: darkGray,
		backgroundColor: white,
		borderRadius: 5,
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 16,
		paddingRight: 16,
		flexGrow: 1
	},
	questionWrapper: {
		flex: 1,
		justifyContent: 'center'
	},
	questionText: {
		textDecorationLine: 'underline',
		textAlign: 'center',
		fontSize: 20
	},
	resultTextGood: {
		color: green,
		fontSize: 46,
		textAlign: 'center'
	},
	resultTextBad: {
		color: red,
		fontSize: 46,
		textAlign: 'center'
	}
})

const mapStateToProps = (state, { title }) => {
	const deck = state[title]

	return {
		deck
	}
}

export default withNavigation(connect(mapStateToProps)(Quiz_Android))
