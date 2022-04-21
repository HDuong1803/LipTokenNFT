import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  handleFetchDataWorldLip } from '../redux/data/dataActions'
import * as s from '../styled/globalStyles'
import LipLayout from './LipLayout';

function WorldLip() {
  const dispatch = useDispatch()
  const blockchain = useSelector(state => state.blockchain)
  const data = useSelector(state => state.data)
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    if (blockchain.account && blockchain.lipToken) {
      dispatch(handleFetchDataWorldLip(blockchain.lipToken))
    }
    setLoading(false)
  }, [dispatch, blockchain.account, blockchain.lipToken]);
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
                  data.worldLips && data.worldLips.map(item => {
                    return (
                      <LipLayout
                        loading={loading}
                        item={item}
                        key={Math.random()}
                        viewOnly
                        noAttack
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

export default WorldLip;
