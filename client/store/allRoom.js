import axios from 'axios'

/* Action Types */
const GET_ROOM = 'GET_ROOM'
const FILTER_ROOM = 'FILTER_ROOM'

/* Action Creators */
const getRoom = (room) => ({
  type: GET_ROOM,
  room,
})

export const filterRoom = (value) => ({
  type: FILTER_ROOM,
  value,
})

/* Thunk Creators */
export const fetchRoom = () => async (dispatch) => {
  try {
    const {data} = await axios.get('/api/room')
    dispatch(getRoom(data))
  } catch (error) {
    console.error(error)
  }
}

export const newRoom = (room) => async (dispatch) => {
  try {
    await axios.post('/api/room', room)
    const {data} = await axios.get('/api/room')
    dispatch(getRoom(data))
  } catch (error) {
    console.error(error)
  }
}

export const roomAddUser = (roomId, playerId) => async (dispatch) => {
  try {
    await axios.put(`/api/room/${roomId}/${playerId}/join`)
  } catch (error) {
    console.error(error)
  }
}

export const roomDeleteUser = (roomId, playerId) => async (dispatch) => {
  try {
    await axios.put(`/api/room/${roomId}/${playerId}/leave`)
  } catch (error) {
    console.error(error)
  }
}

/* Initial State */
const initialState = {
  allRoom: [],
  selectedRoom: [],
}

/* Reducer */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ROOM:
      return {...state, allRoom: action.room, selectedRoom: action.room}
    case FILTER_ROOM: {
      return {
        ...state,
        selectedRoom: state.allRoom.filter((word) => {
          return word.name.includes(action.value)
        }),
      }
    }
    default:
      return state
  }
}
