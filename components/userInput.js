import '../styles/style.scss'

export default class extends React.Component {
	
	constructor(props) {
		super(props)
		this.inputRef = null
	}

	componentDidMount() {
		this.inputRef.addEventListener('keydown', this.handleInput)
	}

	componentWillUnmount() {
		this.inputRef.removeEventListener('keydown', this.handleInput)
	}

	setInputRef = (node) => this.inputRef = node

	handleInput = (e) => {
		if(e.which === 13) {
			console.log('pressed')
			e.preventDefault()
			this.props.onEnter()
		}
	}

	render() {
		return (
			<input name="message-to-send" 
					id="message-to-send" 
					placeholder ="Type your message" 
					onChange={this.props.onChange}
					value={this.props.value}
					ref={this.setInputRef}
			/>
		)
	}
}