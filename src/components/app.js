import React, { Component } from 'react'
import axios from 'axios'
export default class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			secret: '',
			data: []
		}
	}

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		)	
	}
}
