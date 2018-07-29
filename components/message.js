import '../styles/style.scss'
import TimeAgo from 'react-timeago'

import { Row, Col, Grid } from './react-flexbox'

export default class extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<li>
				{this.props.my ?
					<><div className='message-data'>
						<span className="message-data-name"><i className="fa fa-circle online"></i> shashaBot</span>
						<span className="message-data-time"><TimeAgo date={this.props.time} minPeriod={60}/></span>
					</div>					
					<Row start='xs'>
						<div className='message my-message'>
							{this.props.text}
						</div>
					</Row></>
					:
					<><div className='message-data align-right'>
						<span className="message-data-time"><TimeAgo date={this.props.time} minPeriod={60}/></span>
						<span className="message-data-name">you<i className="fa fa-circle online me"></i></span>
					</div>					
					<Row end='xs'>
						<div className='message other-message'>
							{this.props.text}
						</div>					
					</Row></>
				}
			</li>
		)
	}
}