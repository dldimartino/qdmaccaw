import axios from 'axios'

/* Action Types */
const GET_ROOM = 'GET_ROOM'

/* Action Creators */
const getRoom = room => ({
  type: GET_ROOM,
  room
})

/* Thunk Creators */
export const fetchRoom = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/room')
    console.log('data: ', data)
    dispatch(getRoom(data))
  } catch (error) {
    console.error(error)
  }
}

/* Reducer */
export default function(state = [], action) {
  switch (action.type) {
    case GET_ROOM:
      return action.room
    default:
      return state
  }
}
