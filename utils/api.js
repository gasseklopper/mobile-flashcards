import { AsyncStorage } from 'react-native'
import { decks } from './_DATA'

const DECKS_STORAGE_KEY = 'Flashcards:decks'

export function getData() {
	return decks
}

function formatDeckResults(results) {
	return results === null ? decks : JSON.parse(results)
}

export function getDecksOld() {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(formatDeckResults)
	return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(result => {
		return formatDeckResults(result)
	})
}

export async function getDecks() {
	try {
		const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY)

		if (storeResults === null) {
		AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
		}

		return storeResults === null ? decks : JSON.parse(storeResults)
	} catch (err) {
		console.log(err)
	}
}

export async function getDeck(id) {
	try {
		const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY)

		return JSON.parse(storeResults)[id]
	} catch (err) {
		console.log(err)
	}
}

export async function saveDeckTitleAS(title) {
	try {
		await AsyncStorage.mergeItem(
		DECKS_STORAGE_KEY,
		JSON.stringify({
			[title]: {
			title,
			questions: []
			}
		})
		)
	} catch (err) {
		console.log(err)
	}
}

export async function addCardToDeckAS(title, card) {
	try {
		const deck = await getDeck(title)

		await AsyncStorage.mergeItem(
		DECKS_STORAGE_KEY,
		JSON.stringify({
			[title]: {
			questions: [...deck.questions].concat(card)
			}
		})
		)
	} catch (err) {
		console.log(err)
	}
}