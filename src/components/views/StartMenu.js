import React, { Component } from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { FormGroup, FormControl } from 'react-bootstrap'
import * as actions from '../../actions'
import {connect} from 'react-redux'
import { browserHistory } from 'react-router'

class StartMenu extends Component {	
	
	handleSubmit = (event) => {
		event.preventDefault()
		let mode = setDifficulty(this.props.formValues)
		let gameConfig = {...this.props.game, ...mode}
		if(gameConfig.difficulty !== undefined)
			this.props.gameOptions(gameConfig)
			browserHistory.push('/gameView')
	}

	render() {
		const { handleSubmit, pristine, reset, submitting, formValues } = this.props
		return (
			<div className="jumbotron center">
				<h1>HangMan</h1>
				<form onSubmit={this.handleSubmit}>
						<label htmlFor="difficulty">Select Difficulty</label>
						<p>
							<Field name="difficulty" component="select">
								<option>Select</option>
								<option value="easy">Easy</option>
								<option value="medium">Medium</option>
								<option value="hard">Hard</option>
							</Field>
						</p>
		        	<button className="btn btn-success" type="submit">Start</button>
				</form>
			</div>
		)
	}
}

function setDifficulty(mode) {
	let difficulty
	let minLength
	let maxLength
	switch(mode) {
		case "easy":
			difficulty = Math.floor(Math.random() * (3 - 1 + 1)) + 1
			minLength = 3
			maxLength = 8
			break
		case "medium":
			difficulty = Math.floor(Math.random() * (6 - 4 + 1)) + 4
			minLength = 5
			maxLength = 12
			break
		case "hard":
			difficulty = Math.floor(Math.random() * (10 - 7 + 1)) + 7
			minLength = 9
			maxLength = 24
			break
		default:
			alert('Please Select an Option!')
	}
	return {difficulty: difficulty, minLength: minLength, maxLength: maxLength}
}

function mapDispatchToProps(state) {
	const selector = formValueSelector('difficulty')
	const formValues = selector(state, 'difficulty')
	return { formValues, game: state.game }
}

StartMenu = reduxForm({
  form: 'difficulty'
})(StartMenu)

StartMenu = connect(mapDispatchToProps, actions)(StartMenu)

export default StartMenu