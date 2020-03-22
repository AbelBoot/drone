import React from "react"

export default class Camera extends React.Component {
	
	video = React.createRef()

	getCamera = () => {
		navigator.mediaDevices
			.getUserMedia({video: true})
			.then(this.cameraSuccess)
			.catch(this.cameraFailed)
	}

	cameraSuccess = (stream) => {
		this.video.current.srcObject = stream
		this.video.current.play()
		this.props.lifting(this.video.current)
	}

	cameraFailed = (error) => {
		console.log("You cannot even get the cam running", error)
	}

	render(){
		return (
			<>
			<button onClick={this.getCamera}>
				Get Camera</button>
			<video 
				width="200px"
				height="150px"
				ref={this.video}></video>
			</>
			)
	}
}