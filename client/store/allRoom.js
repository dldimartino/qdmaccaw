import axios from 'axios'

/* Action Types */
const GET_ROOM = 'GET_ROOM'
const FILTER_ROOM = 'FILTER_ROOM'
const USER_IN_ROOM = 'USER_IN_ROOM'
const ADD_USER = 'ADD_USER'
const REMOVE_USER = 'REMOVE_USER'

/* Action Creators */

const deleteUser = (user) => ({
  type: REMOVE_USER,
  user,
})

const getRoom = (room) => ({
  type: GET_ROOM,
  room,
})

const addedUser = (user) => ({
  type: ADD_USER,
  user,
})

const listOfUser = (users) => ({
  type: USER_IN_ROOM,
  users,
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
    const {data} = await axios.put(`/api/room/${roomId}/${playerId}/join`)
    dispatch(addedUser(data))
  } catch (error) {
    console.error(error)
  }
}

export const roomDeleteUser = (roomId, playerId) => async (dispatch) => {
  try {
    const {data} = await axios.put(`/api/room/${roomId}/${playerId}/leave`)
    dispatch(deleteUser(data))
  } catch (error) {
    console.error(error)
  }
}

export const usersInRoom = (roomId) => async (dispatch) => {
  try {
    const {data} = await axios.get(`/api/room/${roomId}`)
    if (data) {
      dispatch(listOfUser(data))
    }
  } catch (error) {
    console.error(error)
  }
}

/* Initial State */
const initialState = {
  allRoom: [],
  selectedRoom: [],
  inRoom: [],
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
    case USER_IN_ROOM:
      return {...state, inRoom: action.users}
    case ADD_USER:
      return {...state, inRoom: [...state.inRoom, action.user]}
    case REMOVE_USER:
      return {
        ...state,
        inRoom: state.inRoom.filter((user) => {
          return !user.name.includes(action.user.name)
        }),
      }
    default:
      return state
  }
}
