module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', function () {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('join_room', (room) => {
      console.log('SERVER ROOM JOINED')
      socket.join(room)
    })

    socket.on('leave_room', (room) => {
      socket.leave(room)
    })

    socket.on('drawing', (drawing, room) => {
      console.log('SERVER DRAWING RECEIVED')
      socket.to(room).emit('drawing', drawing)
    })
  })
}
