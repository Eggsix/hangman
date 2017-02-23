import axios from 'axios'
import { SET_WORD, 
		SET_CHOICES, 
		INCREMENT_CHOICES_RIGHT,
		DEINCREMENT_LIVES } from './types'

export function gameOptions(gameOptions) {
	let difficulty = gameOptions.difficulty || 1
	let minLength = gameOptions.minLength || 2
	let maxLength = gameOptions.maxLength || 4
	let start = gameOptions.start || 0
	let count = 100
	let choices = []
	let level = gameOptions.level || 1
	let choicesRight = 0
	let lives = 6

	let gameConfig = { difficulty: difficulty, 
					   minLength: minLength, 
					   maxLength: maxLength, 
					   start: start, 
					   count: count, 
					   choices: choices,
					   level: level,
					   choicesRight: choicesRight,
					   lives: lives }
	const ROOT_URL = `http://localhost:8080/words?difficulty=${gameOptions.difficulty}&minLength=${gameOptions.minLength}&maxLength=${gameOptions.maxLength}&start=${gameOptions.start}&count=${gameOptions.count}`
	return function(dispatch) {
		axios.get(ROOT_URL)
		     .then(response => {
		     		let wordsArr = response.data.split('\n')
		     		let word = selectWord(wordsArr)
		     		dispatch({
		     			type: SET_WORD,
		     			payload: word,
		     			configs: gameConfig
		     		})
		     		
		     })
		     .catch(error => console.log(error))
	}
		
}

export function incrementChoicesRight(count) {
	return function(dispatch) {
		dispatch({
			type: INCREMENT_CHOICES_RIGHT,
			payload: count
		})
	}
}

export function deincrementLives() {
	return function(dispatch) {
		dispatch({
			type: DEINCREMENT_LIVES,
		})
	}
}

export function playerKeyEvent(key) {
	return function(dispatch) {
		dispatch({
			type: SET_CHOICES,
			payload: key
		})
	}
}
function selectWord(array) {
	let randomIndex = Math.floor(Math.random() * (100 - 0 + 1)) + 0
	return array[randomIndex]
}