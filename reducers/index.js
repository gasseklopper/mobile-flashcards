import { RECEIVE_ENTRIES, ADD_ENTRY } from '../actions'
// added reduceefr from https://github.com/udacity/reactnd-UdaciFitness-complete/blob/reducers/components/AddEntry.js
function entries (state = {}, action) {
  switch (action.type) {
    case RECEIVE_ENTRIES :
      return {
        ...state,
        ...action.entries,
      }
    case ADD_ENTRY :
      return {
        ...state,
        ...action.entry
      }
    default :
      return state
  }
}

export default entries