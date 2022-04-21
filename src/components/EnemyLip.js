import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleFetchDataEnemy } from '../redux/data/dataActions'
import * as s from '../styled/globalStyles'
import LipLayout from './LipLayout';

function EnemyLip() {
  const dispatch = useDispatch()
  const blockchain = useSelector(state => state.blockchain)
  const data = useSelector(state => state.data)
  const [loading, setLoading] = React.useState(true)
  const [selectLip, setSelectLip] = React.useState(null)
  React.useEffect(() => {
    if (blockchain.account && blockchain.lipToken) {
      dispatch(handleFetchDataEnemy(blockchain.lipToken, blockchain.account))
    }
    setLoading(false)
  }, [dispatch, blockchain.account, blockchain.lipToken]);
  
  function handleAttack(enemyId) {
    if (selectLip === null || selectLip === undefined) {
      alert("Please select lip you want to fight!")
      return
    }
    setLoading(true);
    blockchain.lipToken.methods
      .attack(parseInt(selectLip), enemyId)
      .send({
        from: blockchain.account
      }, (err, val) => {
        if (!err) {
          if (val) val = parseInt(val.toString()) 
          if (val === -1) alert("You lose")
          else alert("You won")
          dispatch(handleFetchDataEnemy(blockchain.lipToken, blockchain.account));
        } else {
          let errMsg = err.code === -32603  ?
          "Error when send message to server" :
          err.data.message.replace("VM Exception while processing transaction: revert", "")

          alert(errMsg)
        }
        setLoading(false);
      })
  }

  if (!blockchain.account) return <></>

  return (
    <>
      <div className="container-fluid mt-5">
        <s.SpacerXSmall />
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <s.SpacerSmall />
              <s.Container fd={"row"} style={{ flexWrap: 'wrap', gap: '3em' }} jc={"center"}>
                {
                  data.enemyLips && data.enemyLips.map(item => {
                    return (
                      <LipLayout
                        loading={loading}
                        item={item}
                        key={Math.random()}
                        viewOnly
                        userLips={data.allOwnerLips}
                        handleAttack={handleAttack}
                        setSelectLip={setSelectLip}
                        selectLip={selectLip}
                      />
                    )
                  })
                }
              </s.Container>
            </div>

          </main>
        </div>
      </div>
    </>
  );
}

export default EnemyLip;
