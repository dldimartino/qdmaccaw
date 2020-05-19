module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', function () {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('join_lobby', (room, user) => {
      socket.join(room)
      socket.to(room).emit('join_lobby_late', user)
      console.log('A user has joined the room')
    })

    socket.on('leave_lobby', (room) => {
      socket.leave(room)
    })

    socket.on('word_generate', (newWord, room) => {
      socket.to(room).emit('send_word', newWord)
    })

    socket.on('start_game', (room) => {
      console.log('SERVER STARTING GAME')
      console.log('SERVER ROOM', room)
      io.in(room).emit('start_game', room)
    })

    socket.on('drawing', (drawing, room) => {
      socket.to(room).emit('drawing', drawing)
    })

    socket.on('chat_message', (message, room) => {
      console.log(`This is the SERVER socket message`, message, room)
      io.emit(room).emit('send_message', message)
    })
  })
}
