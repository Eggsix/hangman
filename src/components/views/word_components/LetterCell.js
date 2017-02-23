import React from 'react'

const LetterCell = (props) => {
	return (
		<td className="tableCell">
			<p className={props.display}>{props.letter}</p>
		</td>
	)
}

export default LetterCell