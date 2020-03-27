const dgram = require("dgram")
const io = require("socket.io")().listen(6767)

const PORT = 8889
const PORTSTATE = 8890
const PORTSTREAM = 11111
const HOST = "192.168.10.1"

const drone = dgram.createSocket("udp4")
drone.bind(PORT)

const commands = ["command", "battery?", "takeoff"]
const commandsLanding = ["command", "land"]

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

drone.on("message", msg => {
	console.log("message from drone is ", msg.toString())
})

io.on("connection", socket => {
	socket.on("battery", command => {
		console.log("Asking battery from browser")
		sendingBasicCommands()
	})
	socket.on("landing", command => {
		console.log("Asking battery to land")
		landing()
	})
	socket.on("green", command => {
		console.log("green is asking the battery")
		sendingBasicCommands()
	})
})










