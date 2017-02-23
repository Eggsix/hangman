import React from 'react'

const ChoicesView = (props) => {
	return (
		<div className="choicesView">
			<h2 className="center">Choices Made</h2>
			<table className="center">
				<tbody>
					<tr>
					{props.choices.map( (choice, index) => <td className="choices" key={index}>-{choice}</td>)}
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default ChoicesView