import '../styles/style.scss'
import { Row, Col, Grid } from './react-flexbox'

import Message from './message'

export default class extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		let { messages } = this.props
		return (
			<>
				{messages.length ?
					<ul style={{width: '100%'}}>
						{messages.map( m => <Message {...m} />)}
					</ul>
				:
					<div class='no-message'>
						Start talking by sending a message
					</div>
				}
			</>
		)
	}
}