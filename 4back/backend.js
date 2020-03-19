const dgram = require("dgram")
const app = require("express")
const http = require("http").Server(app)

const PORT = 8889
const PORTSTATE = 8890
const PORTSTREAM = 11111
const HOST = "192.168.10.1"

const drone = dgram.createSocket("udp4")
drone.bind(PORT)

const commands = ["command", "battery?"]


function sendingBasicCommands(){
	commands.forEach(command => {
		return drone.send(command, 0, command.length, PORT, HOST)
	})
}

sendingBasicCommands()

drone.on("message", msg => {
	console.log("message from drone is ", msg.toString())
})
