import axios from 'axios'

/* Action Types */
const GETTING_USERS = 'GETTING_USERS'

/* Action Creators */
const gotUsers = users => ({
  type: GETTING_USERS,
  users
})

/* Thunk Creators */
export const fetchUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(gotUsers(data))
  } catch (error) {
    console.error(error)
  }
}

/* Reducer */
export default function(state = [], action) {
  switch (action.type) {
    case GETTING_USERS:
      return action.users
    default:
      return state
  }
}
