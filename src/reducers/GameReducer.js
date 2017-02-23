import { SET_WORD, 
		SET_CHOICES, 
		INCREMENT_CHOICES_RIGHT,
		DEINCREMENT_LIVES } from '../actions/types'
export default function(state = {}, action) {
	switch(action.type) {
		case SET_WORD:
			return { ...state, ...action.configs,  word: action.payload }
		case SET_CHOICES:
			return {...state, choices: [...state.choices, ...action.payload] }
		case INCREMENT_CHOICES_RIGHT:
			return {...state, choicesRight: state.choicesRight + action.payload }
		case DEINCREMENT_LIVES:
			return {...state, lives: state.lives - 1 }
	}
	return state
}