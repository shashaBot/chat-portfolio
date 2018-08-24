import '../styles/style.scss'
import TimeAgo from 'react-timeago'
import TextMessage from './textMessage'
import QuickReply from './quickReplyMessage'
import FileAttachment from './fileAttachmentMessage'

import { Row, Col, Grid } from './react-flexbox'

export default class extends React.Component {
	state = {text: '', replies: [], fileUrl: ''}
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.setMessageComponents(this.props.message)		
	}

	setMessageComponents(msg) {
		let {text, replies, fileUrl} = msg
		this.setState({
			text,
			replies,
			fileUrl
		})
	}

	render() {
		console.log('render props', this.props)
		return (
			<>
				
				{
					this.state.text &&
						<li>
							<TextMessage {...this.props} text={this.state.text}/>
						</li>
				}
				{
					this.state.replies.map( reply => {
						<li>
							<QuickReply {...this.props} reply={reply}/>
						</li>
					})
				}
				{
					this.state.fileUrl &&
						<li>
							<FileAttachment {...this.props} url={this.state.fileUrl} />
						</li>
				}
			</>
		)
	}
}