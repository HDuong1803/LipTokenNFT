import { actionTypes } from './blockchainActions'
const initialState = {
  loading: false,
  account: null,
  lipToken: null,
  web3: null,
  errMesg: ""
}

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CONNECTION_REQUEST:
      return {
        ...initialState,
        loading: true
      }
    case actionTypes.CONNECTION_SUCCESS:
      return {
        ...initialState,
        account: action.payload.account,
        loading: false,
        lipToken: action.payload.lipToken,
        web3: action.payload.web3
      }
    case actionTypes.CONNECTION_FAILED:
      return {
        ...initialState,
        loading: false,
        errMesg: action.payload
      }
    case actionTypes.UPDATE_ACCOUNT:
      return {
        ...state,
        account: action.payload
      }
    default:
      return state
  }
}

export default blockchainReducer