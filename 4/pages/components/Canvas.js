import React from "react"
import CanvasStatic from "./CanvasStatic"
import { main } from "../Utilities/Util"

export default class Canvas extends React.Component {

	canvas = React.createRef()

	state = {
		previous: null
	}

	callingDrone = () => {
		console.log("calling drone")
	}
	
	filming = () => {
		setInterval(() => {
			return this.getCanvas()
		}, 16)
	}

	getCanvas = () => {
		const canvas = this.canvas.current.canvasStatic.current
		const ctx = canvas.getContext("2d")
		const { width, height } = canvas
		ctx.drawImage(this.props.video, 0, 0, width, height)
		this.canvas.current.drawingStatic()
		const blank = ctx.createImageData(width, height)
		const current = ctx.getImageData(0, 0, width, height)
		if (this.state.previous === null){this.setState({previous: current})}
		main(blank.data, this.state.previous.data, current.data)
		ctx.putImageData(blank, 0, 0 )
		this.setState({previous: current})
	}

	render(){
		return (
			<>
			<button onClick={this.filming}>Get Canvas</button>
			<CanvasStatic ref={this.canvas}/>
			<button onClick={this.callingDrone}>Calling drone</button>
			</>
			)
	}
}