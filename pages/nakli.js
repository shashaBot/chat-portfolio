import'../styles/style.scss'
import axios from 'axios'

import UserInput from '../components/userInput'

import { Grid, Row, Col } from '../components/react-flexbox'

export default class extends React.Component {
	state = { query: ''}

	getResponse = (query) => {
		axios.post('http://localhost:8000/api/detectTextIntent', {
			text: query
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
		let audioBuf = result[0].outputAudio.data
		let typedArr = Uint32Array.from(audioBuf)
		console.log(typedArr, typeof typedArr)
		console.log(typedArr.buffer, typeof typedArr.buffer)
		let audioCtx = new (window.AudioContext || window.webkitAudioContext)()
		let source = audioCtx.createBufferSource()
		audioCtx.decodeAudioData(typedArr.buffer)
			.then( (audioBuffer) => {
				source.buffer = audioBuffer
				source.connect(audioCtx.destination)
				source.loop = false
			}).catch( err => {
				console.log('error decoding data', err)
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
		// return (
		// 	<>
		// 		<Grid fluid>
		// 			<Row center='xs'>
		// 				<Col xs>
		// 					<h1 style={{textAlign: 'center'}}>ShashaBot</h1>
		// 				</Col>
		// 			</Row>
		// 			<Row center='xs'>
		// 				<Col xs={10} md={8}>
		// 					<ChatWindow />
		// 				</Col>
		// 			</Row>
		// 			<Row center='xs' className='footer'>
		// 				<Col xs>
		// 					<MicButton onToggle={this.onToggle}/>
		// 					<UserInput onSend={this.getResponse} value={this.state.query}/>
		// 				</Col>
		// 			</Row>
		// 		</Grid>
		// 		<style>{`
		// 			.footer {
		// 				background-color: #e0e0e0;
		// 				position: fixed;
		// 				bottom: 0;
		// 				width: 100%;
		// 				height: 120px;
		// 				margin: 0 -16px;
		// 			}
		// 		`}
		// 		</style>				
		// 	</>
		// )

		return (
			<>
  <div class="container clearfix">
    <div class="people-list" id="people-list">
      <div class="search">
        <input type="text" placeholder="search" />
        <i class="fa fa-search"></i>
      </div>
      <ul class="list">
        <li class="clearfix">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
          <div class="about">
            <div class="name">Vincent Porter</div>
            <div class="status">
              <i class="fa fa-circle online"></i> online
            </div>
          </div>
        </li>
        
        <li class="clearfix">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg" alt="avatar" />
          <div class="about">
            <div class="name">Aiden Chavez</div>
            <div class="status">
              <i class="fa fa-circle offline"></i> left 7 mins ago
            </div>
          </div>
        </li>
        
        <li class="clearfix">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg" alt="avatar" />
          <div class="about">
            <div class="name">Mike Thomas</div>
            <div class="status">
              <i class="fa fa-circle online"></i> online
            </div>
          </div>
        </li>
        
        <li class="clearfix">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg" alt="avatar" />
          <div class="about">
            <div class="name">Erica Hughes</div>
            <div class="status">
              <i class="fa fa-circle online"></i> online
            </div>
          </div>
        </li>
        
        <li class="clearfix">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_05.jpg" alt="avatar" />
          <div class="about">
            <div class="name">Ginger Johnston</div>
            <div class="status">
              <i class="fa fa-circle online"></i> online
            </div>
          </div>
        </li>
        
        <li class="clearfix">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_06.jpg" alt="avatar" />
          <div class="about">
            <div class="name">Tracy Carpenter</div>
            <div class="status">
              <i class="fa fa-circle offline"></i> left 30 mins ago
            </div>
          </div>
        </li>
        
        <li class="clearfix">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_07.jpg" alt="avatar" />
          <div class="about">
            <div class="name">Christian Kelly</div>
            <div class="status">
              <i class="fa fa-circle offline"></i> left 10 hours ago
            </div>
          </div>
        </li>
        
        <li class="clearfix">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_08.jpg" alt="avatar" />
          <div class="about">
            <div class="name">Monica Ward</div>
            <div class="status">
              <i class="fa fa-circle online"></i> online
            </div>
          </div>
        </li>
        
        <li class="clearfix">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_09.jpg" alt="avatar" />
          <div class="about">
            <div class="name">Dean Henry</div>
            <div class="status">
              <i class="fa fa-circle offline"></i> offline since Oct 28
            </div>
          </div>
        </li>
        
        <li class="clearfix">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_10.jpg" alt="avatar" />
          <div class="about">
            <div class="name">Peyton Mckinney</div>
            <div class="status">
              <i class="fa fa-circle online"></i> online
            </div>
          </div>
        </li>
      </ul>
    </div>
    
    <div class="chat">
      <div class="chat-header clearfix">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
        
        <div class="chat-about">
          <div class="chat-with">Chat with Vincent Porter</div>
          <div class="chat-num-messages">already 1 902 messages</div>
        </div>
        <i class="fa fa-star"></i>
      </div> 
      
      <div class="chat-history">
        <ul>
          <li class="clearfix">
            <div class="message-data align-right">
              <span class="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp;
              <span class="message-data-name" >Olia</span> <i class="fa fa-circle me"></i>
              
            </div>
            <div class="message other-message float-right">
              Hi Vincent, how are you? How is the project coming along?
            </div>
          </li>
          
          <li>
            <div class="message-data">
              <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
              <span class="message-data-time">10:12 AM, Today</span>
            </div>
            <div class="message my-message">
              Are we meeting today? Project has been already finished and I have results to show you.
            </div>
          </li>
          
          <li class="clearfix">
            <div class="message-data align-right">
              <span class="message-data-time" >10:14 AM, Today</span> &nbsp; &nbsp;
              <span class="message-data-name" >Olia</span> <i class="fa fa-circle me"></i>
              
            </div>
            <div class="message other-message float-right">
              Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
            </div>
          </li>
          
          <li>
            <div class="message-data">
              <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
              <span class="message-data-time">10:20 AM, Today</span>
            </div>
            <div class="message my-message">
              Actually everything was fine. I'm very excited to show this to our team.
            </div>
          </li>
          
          <li>
            <div class="message-data">
              <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
              <span class="message-data-time">10:31 AM, Today</span>
            </div>
            <i class="fa fa-circle online"></i>
            <i class="fa fa-circle online" style={{color: '#AED2A6'}}></i>
            <i class="fa fa-circle online" style={{color: '#DAE9DA'}}></i>
          </li>
          
        </ul>
        
      </div> 
      
      <div class="chat-message clearfix">
        <textarea name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3"></textarea>
                
        <i class="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
        <i class="fa fa-file-image-o"></i>
        
        <button>Send</button>

      </div> 
      
    </div> 
    
  </div> 
  </>

		)
	}
}

const ChatWindow = (props) => (
	<>
		<div className='test'/>
		<style>{`
			div.test {
				background-color: #e0e0e0;
				padding: 15px;
				max-height: 400px;
				overflow-y: auto;
				height: 300px;				
			}
		`}
		</style>
	</>
)

const MicButton = (props) => (
	<button onClick={props.onToggle}>
		Mic
	</button>
)