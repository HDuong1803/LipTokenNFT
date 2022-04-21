import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleConnect } from '../redux/blockchain/blockchainActions'
import { handleFetchData } from '../redux/data/dataActions'
import * as s from '../styled/globalStyles'
import LipLayout from './LipLayout'

function OwnLip() {
  const dispatch = useDispatch()
  const blockchain = useSelector(state => state.blockchain)
  const data = useSelector(state => state.data)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (blockchain.account && blockchain.lipToken) {
      dispatch(handleFetchData(blockchain.lipToken, blockchain.account))
    }
  }, [dispatch, blockchain.account, blockchain.lipToken]);

  const mintNFT = (_name) => {
    setLoading(true);
    blockchain.lipToken.methods
      .createRandomLip(_name)
      .send({
        from: blockchain.account,
        value: blockchain.web3.utils.toWei("0.01", "ether"),
      }, (err) => {
        if (!err) {
          dispatch(handleFetchData(blockchain.lipToken, blockchain.account));
        } else {
          alert("Error payment")
        }
        setLoading(false);
      })
  };

  const handleLevelUpLip = (lip) => {
    setLoading(true);
    blockchain.lipToken.methods
      .levelUp(parseInt(lip.id.toString()))
      .send({
        from: blockchain.account,
        value: blockchain.web3.utils.toWei("0.01", "ether")
      }, (err) => {
        if (!err) {
          dispatch(handleFetchData(blockchain.lipToken, blockchain.account));
          alert("It might be take a few second to update your NFT!")
        } else {
          console.log('level up err', err);
          alert("You have to wait 1 day to level up your lip")
        }
        setLoading(false);
      })
  };

  function handleChangeName(_id, _newName) {
    if (!_newName) return
    setLoading(true);
    blockchain.lipToken.methods
      .changeName(_id, _newName).send({
        from: blockchain.account
      }, (err) => {
        if (!err) {
          alert("It might be take a few second to update your NFT!")
          dispatch(handleFetchData(blockchain.lipToken, blockchain.account));
        } else {
          console.log('change name err', err);
          alert("Your lip must be at least level 2 to change its name.")
        }
        setLoading(false);
      })
  }

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              {
                (!blockchain.account ||
                  !blockchain.lipToken) ? (
                  <button className='connect_btn' onClick={(e) => {
                    e.preventDefault()
                    dispatch(handleConnect())
                  }}>Connect to the game with metamask</button>
                ) : (
                  <>
                    <s.TextTitle className='welcome_title'>Welcome to the game</s.TextTitle>
                    <s.SpacerSmall />
                    <button disabled={loading} onClick={(e) => {
                      e.preventDefault()
                      mintNFT("BUI HUY TUNG :)")
                    }} className="create_button" >Create new random lip</button>
                    {
                      blockchain.errMesg && (
                        <>
                          <s.SpacerXSmall />
                          <s.TextDescription>{blockchain.errMesg}</s.TextDescription>
                        </>
                      )
                    }

                    <s.SpacerSmall />
                    <s.Container fd={"row"} style={{ flexWrap: 'wrap', gap: '3em' }} jc={"center"}>

                      {
                        data.allOwnerLips && data.allOwnerLips.map(item => {
                          return (
                            <LipLayout
                              loading={loading}
                              key={Math.random()}
                              item={item}
                              handleLevelUpLip={handleLevelUpLip}
                              handleChangeName={handleChangeName}
                            />
                          )
                        })
                      }
                    </s.Container>
                  </>
                )
              }
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default OwnLip;
