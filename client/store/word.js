import axios from 'axios'

/* Action Types */
const GET_WORD = 'GET_WORD'
const FIND_RANDOM_WORD = 'FIND_RANDOM_WORD'

/* Action Creators */
const getWord = word => ({
  type: GET_WORD,
  word
})

const foundRandom = word => ({
  type: FIND_RANDOM_WORD,
  word
})

/* Thunk Creators */
export const fetchWord = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/word')
    dispatch(getWord(data))
  } catch (error) {
    console.error(error)
  }
}

export const findRandomWord = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/word/random')
    // console.log("Randomized Word (DATA) -------->>>>>>>>", data)
    dispatch(foundRandom(data))
  } catch (error) {
    console.error(error)
  }
}

/* Reducer */
export default function(state = [], action) {
  switch (action.type) {
    case GET_WORD:
      return action.word
    case FIND_RANDOM_WORD:
      return action.word
    default:
      return state
  }
}
