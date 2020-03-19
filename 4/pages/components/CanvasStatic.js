import React from "react"

export default class CanvasStatic extends React.Component {
	
	canvasStatic = React.createRef()

	drawingStatic = () => {
		const canvas = this.canvasStatic.current
		const ctx = canvas.getContext("2d")
		const { width, height } = canvas
		ctx.strokeStyle = "red"
        ctx.strokeRect(0, 0, width/4, height * 3/4)
        ctx.strokeStyle = "green"
        ctx.strokeRect(width * 3/4, 0, width * 1/4, height * 3/4)
        ctx.strokeStyle = "blue"
        ctx.strokeRect(width * 0.26,
            height * 3/4, width * 0.48, height * 1/4)
        ctx.strokeStyle = "yellow"
        ctx.strokeRect(width * 1/3,
            height * 1/5, width * 1/3, height * 1/5)
	}

	render(){
		return (
			<>
			<canvas
				width="200px"
				height="150px"
				ref={this.canvasStatic}
			></canvas>				
			</>
			)
	}
}