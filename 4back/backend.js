const dgram = require("dgram")
const io = require("socket.io")().listen(6767)

const PORT = 8889
const PORTSTATE = 8890
const PORTSTREAM = 11111
const HOST = "192.168.10.1"

const drone = dgram.createSocket("udp4")
drone.bind(PORT)

//const commands = ["command", "battery?", "takeoff"]
const commandsLanding = ["command", "land"]
const commandsCWww = ["command", "cw 3600"]
const commandsFlippp = ["command", "flip l"]

function sendingBasicCommands(){
	commands.forEach(command => {
		return drone.send(command, 0, command.length, PORT, HOST)
	})
}

function landing(){
	commandsLanding.forEach(command => {
		return drone.send(command, 0, command.length, PORT, HOST)
	})
}

function commandsFlip(){
	commandsFlippp.forEach(command => {
		return drone.send(command, 0, command.length, PORT, HOST)
	})
}

function commandsCW(command){
	commandsCWww.forEach(command => {
		return drone.send(command, 0, command.length, PORT, HOST)
	})
}

drone.on("message", msg => {
	console.log("message from drone is ", msg.toString())
})

io.on("connection", socket => {
	socket.on("battery", () => {
		console.log("Asking battery manually")
		sendingBasicCommands()
	})
	socket.on("landing", () => {
		console.log("Asking manually to land")
		landing()
	})
	socket.on("green", () => {
		console.log("Green Takeoff")
		sendingBasicCommands()
		
	})
	socket.on("red", () => {
		//try without sending command first
		console.log("Red landing")
		landing()
		//drone.send(command, 0, command.length, PORT, HOST)
	})
	socket.on("blue", () => {
		console.log("Blue Flip")
		commandsFlip()
		//drone.send(command, 0, command.length, PORT, HOST)
	})
	socket.on("yellow", (command) => {
		console.log("Yellow CW")
		console.log("commanddd", command)
		commandsCW()
		//Try with the command below instead
		//drone.send(command, 0, command.length, PORT, HOST)
		//Try also when sending the command from front
	})
})










