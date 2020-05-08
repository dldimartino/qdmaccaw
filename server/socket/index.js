// const drawings = {}
// function getDrawing(drawingName) {
//   if (drawings[drawingName] === undefined) {
//     drawings[drawingName] = []
//   }
//   return drawings[drawingName]
// }

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', function() {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('drawing', function(data) {
      socket.broadcast.emit('drawing', data)
    })
  })
}
