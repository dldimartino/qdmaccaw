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

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
    // socket.on('join-drawing', (drawingName) => {
    //   socket.join(drawingName)
    //   const drawing = getDrawing(drawingName)
    //   socket.emit('replay-drawing', drawing)
    // })

    // socket.on('draw-from-client', (drawingName, start, end, color) => {
    //   const drawing = getDrawing(drawingName)
    //   drawing.push([start, end, color])
    //   socket.broadcast
    //     .to(drawingName)
    //     .emit('draw-from-server', start, end, color)
    // })
  })
}
