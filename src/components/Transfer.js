import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleFetchData } from '../redux/data/dataActions'
import * as s from '../styled/globalStyles'

export default function Transfer() {
  const blockchain = useSelector(state => state.blockchain)
  const data = useSelector(state => state.data)
  const [loading, setLoading] = React.useState(false)
  const dispatch = useDispatch()
  
  React.useEffect(() => {
    if (blockchain.account && blockchain.lipToken) {
      dispatch(handleFetchData(blockchain.lipToken, blockchain.account))
    }
  }, [dispatch, blockchain.account, blockchain.lipToken]);

  function handleTransferLip(e) {
    e.preventDefault()
    setLoading(true)
    blockchain.lipToken.methods
      .transferFrom(blockchain.account, e.target.to.value, parseInt(e.target.from.value))
      .send({
        from: blockchain.account
      }, (err) => {
        if (!err) {
          alert("Transfer successfully!")
          dispatch(handleFetchData(blockchain.lipToken, blockchain.account));
        } else {
          alert("Error when sending message!")
        }
        setLoading(false)
      })
  }
  return (
    <s.Container js="center" ai="center" >
      <s.SpacerMedium/>
      <form
        className='transfer_container'
        onSubmit={handleTransferLip}
      >
        <div className='input_container'>
          <s.TextSubTitle><label htmlFor='from'>Select your lip: </label></s.TextSubTitle>        
          <select id="from" required>
            <option value={""}>Select your lip</option>
            {data.allOwnerLips && data.allOwnerLips.length > 0 && data.allOwnerLips.map(item => {
              return (
                <option
                  value={item.id.toString()}
                  key={Math.random()}
                  dangerouslySetInnerHTML={{
                    __html: `ID: ${item.id.toString()}    NAME: ${item.name}    RARITY: ${item.rarity}`
                  }}
                />
              )
            })}
          </select>
        </div>

        <div className='input_container'>
          <s.TextSubTitle><label htmlFor='to'>To: </label></s.TextSubTitle>
          <input id="to" required placeholder='Address'/>
        </div>
        <input disabled={loading} type="submit" className='submit_btn'/>
      </form>
    </s.Container>
  )
}
