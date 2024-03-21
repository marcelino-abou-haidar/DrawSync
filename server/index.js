const { WebSocketServer } = require('ws')
const http = require('http')

const PORT = 3000
const server = http.createServer()
const ws = new WebSocketServer({ server })

server.listen(PORT, () => {
	console.log(`Backend server started..`)
	console.log(`Listening on port ${PORT}`)
})

ws.on('connection', (connection) => {
	console.log(connection)
})
