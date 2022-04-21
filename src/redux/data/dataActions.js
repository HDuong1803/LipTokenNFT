export const actionTypes = Object.freeze({
  CHECK_DATA_REQUEST: "CHECK_DATA_REQUEST",
  CHECK_DATA_SUCCESS: 'CHECK_DATA_SUCCESS',
  CHECK_DATA_FAILED: 'CHECK_DATA_FAILED'
})

const fetchDataRequest = () => ({
  type: actionTypes.CHECK_DATA_REQUEST
})

const fetchDataSuccess = (payload) => ({
  type: actionTypes.CHECK_DATA_SUCCESS,
  payload: payload
})

const fetchDataFailed = (msg) => ({
  type: actionTypes.CHECK_DATA_FAILED,
  payload: msg
})


export const handleFetchData = (lipToken, account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest())
    try {
      let allOwnerLips = await lipToken.methods.getOwnerLips(account).call()
      dispatch(fetchDataSuccess({
        allOwnerLips: allOwnerLips
      }))
    } catch (error) {
      console.log("fetchDataFailed", error)
      dispatch(fetchDataFailed("Couldn't load data from contract."))
    }
  }
}

export const handleFetchDataEnemy = (lipToken, account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest())
    try {
      let enemyLips = await lipToken.methods.getEnemy(account).call()
      let allOwnerLips = await lipToken.methods.getOwnerLips(account).call()
      dispatch(fetchDataSuccess({
        enemyLips: enemyLips,
        allOwnerLips: allOwnerLips
      }))
    } catch (error) {
      console.log("fetchDataFailed enemy", error)
      dispatch(fetchDataFailed("Couldn't load data from contract."))
    }
  }
}

export const handleFetchDataWorldLip = (lipToken) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest())
    try {
      let worldLips = await lipToken.methods.getAllLips().call()
      dispatch(fetchDataSuccess({
        worldLips: worldLips
      }))
    } catch (error) {
      console.log("fetchDataFailed world", error)
      dispatch(fetchDataFailed("Couldn't load data from contract."))
    }
  }
}