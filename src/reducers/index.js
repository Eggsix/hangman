import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import GameReducer from './GameReducer'
const rootReducer = combineReducers({
  form,
  game: GameReducer
});

export default rootReducer;
