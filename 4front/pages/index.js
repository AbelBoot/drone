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
			<Canvas 
				width="200px"
				height="150px"
				video={this.state.video}
			/>
			</>
			)
	}
}