import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Loading from 'react-loading-spinner'
import Spinner from 'react-md-spinner'
import { browserHistory } from 'react-router'
import ChoicesView from './ChoicesView'
import WordView from './word_components/WordView'

class GameView extends Component {

	_handleKeyDown = (event) => {
		let regex = new RegExp("[a-z]");
		let keyPressed = event.key.toLowerCase()

		/*
			-checks if choices are already made
			-checks if choices are only lowercased a-z
			-checks if it's not the control key
			-checks if it's not the meta key the alt key
			-checks if it's not the shift key 
			-checks if it's not the enter key
			-checks if it's not the backspace key
			--checks if it's not the caps lock key

		*/
		if(!this.props.choices.includes(keyPressed) && regex.test(keyPressed) && !event.ctrlKey && !event.metaKey && !event.altKey && event.keyCode !== 9 && event.keyCode !== 20 && event.keyCode !== 13 && event.keyCode !== 8 && !event.shiftKey) {
			
			//loggs choices made into an array to keep track
			this.props.playerKeyEvent(keyPressed)
			//if keys pressed match against word log how many right choices are made
			if(this.props.word.includes(keyPressed)) {
				let regex = RegExp(keyPressed, 'g')
				let count = (this.props.word.match(regex) || []).length
				this.props.incrementChoicesRight(count)

				if(this.props.choicesRight === this.props.word.length) {
					let difficulty = this.props.difficulty + 1
					let maxLength = this.props.maxLength + 1
					let level = this.props.level + 1

					let nextLvl = { difficulty: difficulty, level: level, maxLength: maxLength, lives: 6, choicesRight: 0, choices: []}
					this.props.gameOptions(nextLvl)
					console.log("You WEEEN!")
				}

			} else {
				this.props.deincrementLives()
				if(this.props.lives === 0) {
					alert('You DED!')
					let reset = { difficulty: this.props.difficulty, level: 1, maxLength: this.props.maxLength,  lives: 6, chooseRight: 0, choices: []}
					this.props.gameOptions(reset)
				}
			}
		}
	}

	//mount listen to key events 
	componentWillMount(){
	    document.addEventListener("keydown", this._handleKeyDown.bind(this));
	}

	//unmount key events
	componentWillUnmount() {
	    document.removeEventListener("keydown", this._handleKeyDown.bind(this));
	}



	render() {
		return (
			<Loading isLoading={!this.props.word}
						 loadingClassName='loading'
						 spinner={Spinner}>
				{ this.props.word ? (
					<div>
						<ChoicesView choices={this.props.choices} />
						<div className="center">
							<img src={"/src/hangman_images/hangman_" + this.props.lives + ".png"} alt="Smiley face" height="200" width="200" />	
						</div>
						<WordView word={this.props.word.split('')} />
						<h3>Lives {this.props.lives}</h3>
						<h3>Level {this.props.level}</h3>
					</div>
					) : null }
			</Loading>
		)
	}
}

function mapDispatchToProps(state) {
	return { word: state.game.word,
			 choices: state.game.choices,
			 choicesRight: state.game.choicesRight,
			 lives: state.game.lives,
			 level: state.game.level,
			 maxLength: state.game.maxLength,
			 difficulty: state.game.difficulty}
}

export default connect(mapDispatchToProps, actions)(GameView)