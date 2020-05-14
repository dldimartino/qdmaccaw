import axios from 'axios'

/* Action Types */
const GETTING_USERS = 'GETTING_USERS'
const UPDATE_WINNER = 'UPDATE_WINNER'
const UPDATE_LOSER = 'UPDATE_LOSER'
const ADD_USER_TO_ROOM = 'ADD_USER_TO_ROOM'

/* Action Creators */
const gotUsers = (users) => ({
  type: GETTING_USERS,
  users,
})

const addedWinner = (user) => ({
  type: UPDATE_WINNER,
  user,
})

const addedLoser = (user) => ({
  type: UPDATE_LOSER,
  user,
})

export const addUserToRoom = (user) => ({
  type: ADD_USER_TO_ROOM,
  user,
})

/* Thunk Creators */
export const fetchUsers = () => async (dispatch) => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(gotUsers(data))
  } catch (error) {
    console.error(error)
  }
}

export const updateWinner = (playerId) => async (dispatch) => {
  try {
    const {data} = await axios.put(`/api/users/${playerId}/winner`)
    dispatch(addedWinner(data))
  } catch (error) {
    console.error(error)
  }
}

export const updateLoser = (playerId) => async (dispatch) => {
  try {
    const {data} = await axios.put(`/api/users/${playerId}/loser`)
    dispatch(addedLoser(data))
  } catch (error) {
    console.error(error)
  }
}

export const roomAddUser = (userId, roomId) => async (dispatch) => {
  try {
    const {data} = await axios.put(`/api/room/${userId}/${roomId}`)
    console.log('data: ', data)
    dispatch(addUserToRoom(data))
  } catch (error) {
    console.error(error)
  }
}

/* Reducer */
export default function (state = [], action) {
  switch (action.type) {
    case GETTING_USERS:
      return action.users
    case UPDATE_WINNER:
      return state
    case UPDATE_LOSER:
      return state
    case ADD_USER_TO_ROOM:
      return state
    default:
      return state
  }
}
