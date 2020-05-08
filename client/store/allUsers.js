import axios from 'axios'

/* Action Types */
const GET_USERS = 'GET_USERS'

/* Action Creators */
const getUsers = users => ({
  type: GET_USERS,
  users
})

/* Thunk Creators */
export const fetchUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    console.log('data: ', data)
    dispatch(getUsers(data))
  } catch (error) {
    console.error(error)
  }
}

/* Reducer */
export default function(state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return state
  }
}
