import { actionTypes } from './dataActions'

const initialState = {
  loading: false,
  enemyLips: [],
  worldLips: [],
  allOwnerLips: [],
  error: false,
  errorMsg: ""
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHECK_DATA_REQUEST:
      return {
        ...initialState,
        loading: true
      }
    case actionTypes.CHECK_DATA_SUCCESS:
      return {
        ...initialState,
        ...action.payload,
        loading: false
      }
    case actionTypes.CHECK_DATA_FAILED:
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload
      }
    default:
      return state
  }
}

export default dataReducer