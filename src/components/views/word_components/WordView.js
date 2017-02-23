import React, { Component} from 'react'
import { connect } from 'react-redux'
import LetterCell from './LetterCell'
import * as actions from '../../../actions'
class WordView extends Component {

	shouldComponentUpdate(nextProps) {
		return this.props.choices !== nextProps.choices ?  true : false	
	}

	componentDidUpdate() {
		console.log('component updated!')
	}

	shouldShow(letter, index) {
		let display

		this.props.choices.includes(letter) ? display = "show" : display = "hide"

		return <LetterCell display={display} key={index} letter={letter}/> 
	}

	render() {
		return(
			<div className="wordView">
				<table className="center">
					<tbody>
						<tr className="tableRow">
							{this.props.word.map( (letter, index) => this.shouldShow(letter, index) )}
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
	
}

function mapStateToProps(state) {
	return { choices: state.game.choices,
			 choicesRight: state.game.choicesRight }
}

export default connect(mapStateToProps, actions)(WordView)