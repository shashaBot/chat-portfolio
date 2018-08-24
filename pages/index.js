import '../styles/style.scss'
import axios from 'axios'

import Loading from '../components/loading'
import UserInput from '../components/userInput'
import MessageList from '../components/chatMessages'
import Message from '../components/message'

import { Grid, Row, Col } from '../components/react-flexbox'

export default class extends React.Component {

	msgsEnd = null

	state = { query: '', messages: [], msgCount: 0, loading: true}

	componentDidMount() {
		setTimeout( () => {
			this.setState({
				loading: false
			})
		}, 2000)
	}

	onSend = () => {
		if(!this.state.query) return
		this.setState( (prevState) => {
			return {
				messages: prevState.messages.concat([{
					key: prevState.msgCount+1,
					time: new Date(), 
					my: false, 
					message: this.state.query
				}]),
				msgCount: ++prevState.msgCount
			}
		}, () => {
			this.msgsEnd.scrollIntoView({ behavior: "smooth" })
		})


		this.getResponse()
	}

	getResponse = () => {
		axios.post('http://localhost:9000/api/detectTextIntent', {
			text: this.state.query
		}).then( res => {
			if(res && res.data) {
				this.handleResult(res.data.result)
			}
		}).catch( err => {
			console.log('error', err)
		})
		this.setState({query: ''})
	}

	handleResult = (result) => {
		console.log(result[0])
		// let audioBuf = result[0].outputAudio.data
		// let typedArr = Uint32Array.from(audioBuf)
		// console.log(typedArr, typeof typedArr)
		// console.log(typedArr.buffer, typeof typedArr.buffer)
		// let audioCtx = new (window.AudioContext || window.webkitAudioContext)()
		// let source = audioCtx.createBufferSource()
		// audioCtx.decodeAudioData(typedArr.buffer)
		// 	.then( (audioBuffer) => {
		// 		source.buffer = audioBuffer
		// 		source.connect(audioCtx.destination)
		// 		source.loop = false
		// 	}).catch( err => {
		// 		console.log('error decoding data', err)
		// 	})

		let messages = result[0].queryResult.fulfillmentMessages
		messages.forEach( msg => {
			if(msg.platform === 'PLATFORM_UNSPECIFIED' && msg.payload.platform === 'website') {
				this.setState( prev => {
					return {
						messages: prev.messages.concat([{
							key: result[0].responseId,
							time: new Date(),
							my: true,
							message: msg.payload.payload
						}])
					}
				})				
			}
		})

		this.msgsEnd.scrollIntoView({ behavior: "smooth" })
	}

	updateQuery = (e) => {
		this.setState({
			query: e.target.value
		})
	}

	onToggle = () => {
		let recognition = new webkitSpeechRecognition()
		recognition.interimResults = true
		recognition.lang = 'en'
		recognition.start()

		recognition.onresult = (event) => {
			for (var i = event.resultIndex; i < event.results.length; ++i){
				this.setState({
					query: event.results[i][0].transcript
				})
			}
		}

		recognition.onend = () => {
			recognition.stop()
			this.getResponse(this.state.query)
		}
	}

	render() {
		if(this.state.loading) 
			return <Loading />

		return (
			<Row className='window-container'>
				<Col xs={3} className='people-list'>
					<Grid fluid style={{height: '100%'}}>
						<Row style={{height: '100%'}}>
							<Col xs={12} style={{height: '70%'}}>
								<div className='faq-header'>
									<i className='icon-stats'></i> freqently asked
								</div>
								<ul className="list">
									<li>
										
									</li>
								</ul>
							</Col>
							<Col xs={12} className='social-footer'>
								<div>
									<a title="GitHub" href="https://github.com/shashaBot" target="_blank"><i className='icon-github'></i></a>
									<a title="Youtube channel" href="https://www.youtube.com/channel/UCme5avh_DUXU-9KmeXAap7Q?ab_channel=CodeKatas" target="_blank"><i className='icon-youtube'></i></a>
									<a title="AngelList" href="https://angel.co/shashwat-gulyani" target="_blank"><i className='icon-angellist'></i></a>
									<a title="Codepen" href="https://codepen.io/shashaBot/" target="_blank"><i className='icon-codepen'></i></a>
								</div>
								<div style={{marginTop: '1rem'}}>
									<a title="LinkedIn" href="https://linkedin.com/in/shashwatgulyani" target="_blank"><i className='fa fa-linkedin'></i></a>
									<a title="Email me" href="mailto:shashwatgulyani@gmail.com" target="_blank"><i className="fa fa-envelope"></i></a>
								</div>
								<div style={{marginTop: '20px'}}>&copy; shashaBot</div>
							</Col>
						</Row>
					</Grid>
				</Col>
				<Col xs={9} className='chat'>
					<Row between='xs' className="chat-header">
						<Col xs={11}>
							<Grid fluid>
								<Row>
									<Col xs={2}>
										<div className='avatar-img' />
									</Col>
									<Col xs={10} className='chat-about'>
										<div className="chat-with">Chat with shashaBot</div>
										<div className="status">
											<i className="fa fa-circle online"></i> online
										</div>
									</Col>
								</Row>
							</Grid>
						</Col>
						<Col xs={1}>
							<i className="fa fa-star"></i>
						</Col>
					</Row> 
					
					<Row className="chat-history">
						<MessageList messages={this.state.messages} />
						<div ref={ (el) => {this.msgsEnd = el }} />
					</Row> 
					
					<Row around='xs' middle='xs' className="chat-message">
						<Col xs={10} >
							<UserInput value={this.state.query} onChange={this.updateQuery} onEnter={this.onSend}/>
						</Col>
						<Col xs={2}>
							<button title="Keyboard shortcut: Enter" onClick={this.onSend}>Send</button>
						</Col>
					</Row>
				</Col>
			</Row>
		)
	}
}
