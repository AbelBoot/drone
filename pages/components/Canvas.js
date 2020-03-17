import React from "react"

export default class Canvas extends React.Component {

	canvas = React.createRef()
	
	filming = () => {
		setInterval(() => {
			return this.getCanvas()
		}, 16)
	}

	getCanvas = () => {
		const canvas = this.canvas.current
		if (canvas !== null) {
			const ctx = canvas.getContext("2d")
			const { width, height } = canvas
			console.log("ctx", ctx)
			ctx.drawImage(this.props.video, 0, 0, width, height)
		}
	}

	render(){
		return (
			<>
			<button onClick={this.filming}>Get Canvas</button>
			<canvas
				width="200px"
				height="150px"
				ref={this.canvas}></canvas>
			</>
			)
	}
}