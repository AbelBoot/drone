import React from "react"
import { useState, useEffect} from 'react';
import CanvasStatic from "./CanvasStatic"
import { main, socket } from "../Utilities/Util"


export default class Canvas extends React.Component {

	canvas = React.createRef()

	state = {
		previous: null,
	}

	checkingBattery = () => {
		//socket.emit("battery")
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
		const blank = ctx.createImageData(width, height)
		const current = ctx.getImageData(0, 0, width, height)
		if (this.state.previous === null){this.setState({previous: current})}
		//console.log("ctx previous second", this.state.previous.data)
		main(blank.data, this.state.previous.data, current.data)
		ctx.putImageData(blank, 0, 0 )
		this.setState({previous: current})
		this.canvas.current.drawingStatic()
		
		const obj = {
			red: [0, 0, width/4, height * 3/4],
			green: [width * 3/4, 0, width * 1/4, height * 3/4],
			blue: [width * 0.26, height * 3/4, width * 0.48, height * 1/4],
			yellow: [width * 1/3, height * 1/5, width * 1/3, height * 1/5],	
		}

        for (const el in obj){
        	const val = obj[el]
        	const areaMatch = ctx.getImageData(val[0], val[1], val[2], val[3])	
        	let i = 0, average = 0;
        	while( i < areaMatch.data.length / 4){
				average += (areaMatch.data[i*4] + areaMatch.data[i*4 + 1] + areaMatch.data[i*4 + 2]) / 3
				i++
        	}   
        	average = Math.round(average / (areaMatch.data.length / 4))
        	if (average > 25){
        		console.log("average", average)
        		console.log("el", el)
        	}  
		}       
	}

	render(){
		return (
			<>
			<button onClick={this.filming}>Get Canvas</button>
			<CanvasStatic ref={this.canvas}/>
			<button onClick={this.checkingBattery}>Checking Battery</button>
			</>
			)
	}
}