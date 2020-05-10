import axios from 'axios'

/* Action Types */
const GET_WORD = 'GET_WORD'

/* Action Creators */
const getWord = word => ({
  type: GET_WORD,
  word
})

/* Thunk Creators */
export const fetchWord = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/play')
    dispatch(getWord(data))
  } catch (error) {
    console.error(error)
  }
}

/* Reducer */
export default function(state = [], action) {
  switch (action.type) {
    case GET_WORD:
      return action.word
    default:
      return state
  }
}
