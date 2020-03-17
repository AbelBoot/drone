import React from "react"
import CanvasStatic from "./CanvasStatic"

export default class Canvas extends React.Component {

	canvas = React.createRef()
	
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
	}

	render(){
		return (
			<>
			<button onClick={this.filming}>Get Canvas</button>
			<CanvasStatic ref={this.canvas}/>
			</>
			)
	}
}