import React from "react"
import Canvas from "./components/Canvas"
import Camera from "./components/Camera"

export default class Index extends React.Component {
	
	state = {
		video: null
	}

	lifting = (stream) => {
		this.setState({video: stream})
	}

	render(){
		return(
			<>
			<Camera lifting={this.lifting}/>
			<Canvas video={this.state.video}/>
			</>
			)
	}
}