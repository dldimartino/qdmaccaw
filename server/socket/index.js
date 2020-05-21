module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', function () {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('join_lobby', (room, user) => {
      socket.join(room)
      socket.to(room).emit('join_lobby_late', user)
    })

    socket.on('leave_lobby', (room) => {
      socket.to(room).emit('left_lobby', user)
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
      console.log('EMITTING TO:', room)
      socket.to(room).emit('drawing', drawing)
    })

    socket.on('clear', (room) => {
      socket.to(room).emit('clear')
    })

    //Chat room logic:
    socket.on('join_chat', (message, room) => {
      socket.join(room)
      io.to(room).emit('chat_joined', message)
      console.log(`You have joined chatroom`)
    })

    socket.on('chat_message', (message, room) => {
      console.log(`This is the SERVER socket to ${room}`, message, room)
      io.to(room).emit('send_message', message)
    })
  })
}
