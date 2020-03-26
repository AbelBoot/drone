import React from "react"

export default class CanvasStatic extends React.Component {
	
	canvasStatic = React.createRef()
	width = parseInt(this.props.width)
	height = parseInt(this.props.height)
	state = {
		obj: {
			red: [0, 0, this.width/4, this.height * 3/4],
			green: [this.width * 3/4, 0, this.width * 1/4, this.height * 3/4],
			blue: [this.width * 0.26, this.height * 3/4, this.width * 0.48, this.height * 1/4],
			yellow: [this.width * 1/3, this.height * 1/5, this.width * 1/3, this.height * 1/5],	
		}
	}
	drawingStatic = () => {
		const canvas = this.canvasStatic.current
		const ctx = canvas.getContext("2d")
		//const { width, height } = canvas
		for (const el in this.state.obj){
			const val = this.state.obj[el]
			console.log("el", el)
			console.log("obj", this.state.obj)
			console.log("obj[el]", this.state.obj[el])
			ctx.strokeStyle = el
			ctx.strokeRect(val[0], val[1], val[2], val[3])
		}
		// ctx.strokeStyle = "red"
  //       ctx.strokeRect(0, 0, width/4, height * 3/4)
        

  //       ctx.strokeStyle = "green"
  //       ctx.strokeRect(width * 3/4, 0, width * 1/4, height * 3/4)
  //       ctx.strokeStyle = "blue"
  //       ctx.strokeRect(width * 0.26,
  //           height * 3/4, width * 0.48, height * 1/4)
  //       ctx.strokeStyle = "yellow"
  //       ctx.strokeRect(width * 1/3,
  //           height * 1/5, width * 1/3, height * 1/5)
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