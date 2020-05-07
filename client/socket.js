import io from 'socket.io-client'
import whiteboard, {draw} from './whiteboard'

const socket = io(window.location.origin)
const drawingName = window.location.pathname

socket.on('connect', () => {
  console.log('Connected to server!')
  socket.emit('join-drawing', drawingName)
})

socket.on('replay-drawing', instructions => {
  instructions.forEach(instruction => draw(...instruction, false))
})

socket.on('draw-from-server', (start, end, color) => {
  draw(start, end, color, false)
})

whiteboard.on('draw', (start, end, color) => {
  socket.emit('draw-from-client', drawingName, start, end, color)
})

export default socket
