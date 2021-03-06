import React from "react"
import { main, socket } from "../Utilities/Util"

export default class Canvas extends React.Component {

	canvas = React.createRef()
	width = parseInt(this.props.width)
	height = parseInt(this.props.height)
	state = {
		previous: null,
		obj: {
			red: [0, 0, this.width/4, this.height * 3/4],
			green: [this.width * 3/4, 0, this.width * 1/4, this.height * 3/4],
			blue: [this.width * 0.26, this.height * 3/4, this.width * 0.48, this.height * 1/4],
			yellow: [this.width * 1/3, this.height * 1/5, this.width * 1/3, this.height * 1/5],	
		}
	}

	checkingBattery = () => {
		socket.emit("battery")
	}

	landing = () => {
		socket.emit("landing")
	}

	filming = () => {
		setInterval(() => {
			return this.getCanvas()
		}, 16)
	}

	getCanvas = () => {
		const canvas = this.canvas.current
		const ctx = canvas.getContext("2d")
		this.canvas.current.width = this.width
		this.canvas.current.height = this.height
		ctx.drawImage(this.props.video, 0, 0, this.width, this.height)
		const blank = ctx.createImageData(this.width, this.height)
		const current = ctx.getImageData(0, 0, this.width, this.height)
		if (this.state.previous === null){this.setState({previous: current})}
		//console.log("ctx previous second", this.state.previous.data)
		main(blank.data, this.state.previous.data, current.data)
		ctx.putImageData(blank, 0, 0 )
		this.setState({previous: current})
		//this.canvas.current.drawingStatic()
		this.drawingStaticCanvas()
        for (const el in this.state.obj){
        	const val = this.state.obj[el]
        	const areaMatch = ctx.getImageData(val[0], val[1], val[2], val[3])	
        	let i = 0, average = 0;
        	while( i < areaMatch.data.length / 4){
				average += (areaMatch.data[i*4] + areaMatch.data[i*4 + 1] + areaMatch.data[i*4 + 2]) / 3
				i++
        	}   
        	average = Math.round(average / (areaMatch.data.length / 4))
        	if (average > 20){
        		console.log(`${el} with ${average}`)
        		if (el == "green"){
        			socket.emit("command", "battery?")
        		}
        		if (el == "red"){
        			socket.emit("command", "land")
        		}
				if (el == "yellow"){
        			socket.emit("command", "cw 3600" )
        		}
        		if (el == "blue"){
        			socket.emit("command", "nothing yet")
        		}
        	}  
		}       
	}

	drawingStaticCanvas = () => {
		const canvas = this.canvas.current
		const ctx = canvas.getContext("2d")
		for (const el in this.state.obj){
			const val = this.state.obj[el]
			ctx.strokeStyle = el
			ctx.strokeRect(val[0], val[1], val[2], val[3])
		}
	}

	fullScreen = () => {
		const canvas = this.canvas.current
		const ctx = canvas.getContext("2d")
		canvas.requestFullscreen()
	}

	render(){
		return (
			<>
			<button onClick={this.filming}>Get Canvas</button>
			<button onClick={this.fullScreen}>Canvas Full Screen</button>
			<canvas ref={this.canvas}></canvas>
			<button onClick={this.checkingBattery}>Checking Battery</button>
			<button onClick={this.landing}>Landing</button>
			</>
			)
	}
}