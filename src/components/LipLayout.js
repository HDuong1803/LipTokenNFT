import React from "react";
import LipRenderer from "./lipRenderer";
import * as s from '../styled/globalStyles'

function LipLayout({ 
  item, handleLevelUpLip, 
  loading, viewOnly, 
  handleChangeName,
  handleAttack, selectLip,
  userLips, setSelectLip, noAttack
}) {
  const solidityTime = (item) => {
    return Number(item.readyTime.toString() + "000")
  }
  const jsTime = Number(new Date())

  return (
    <s.Container>
      <LipRenderer lip={item} />
      <s.SpacerXSmall />
      <s.Container>
        <s.TextDescription margin="6px 0">ID: {item.id.toString()}</s.TextDescription>
        <s.TextDescription margin="6px 0">DNA: {item.dna.toString()}</s.TextDescription>
        <s.TextDescription margin="6px 0">LEVEL: {item.level}</s.TextDescription>
        <s.TextDescription margin="6px 0">RARITY: {item.rarity}</s.TextDescription>
        <s.TextDescription margin="6px 0">
          NAME: {item.name}
        </s.TextDescription>
        {
          !viewOnly && (
            <s.TextDescription margin="6px 0">WAIT TIME: {
              solidityTime(item) < jsTime ? "READY" :
                new Date(solidityTime(item)).toDateString()
            }</s.TextDescription>
          )
        }
        {
          !viewOnly ? (
            <>
              <s.SpacerXSmall />
              <button 
                disabled={loading} 
                onClick={(e) => {
                  e.preventDefault()
                  handleLevelUpLip(item)
                }}
                className="level_up_button"
              >Level up</button>
              <button 
                className="change_name" 
                disabled={loading} 
                className="change_name_button"
                onClick={(e) => {
                  e.preventDefault()
                  const newName = window.prompt("Enter your new name: ")
                  handleChangeName(parseInt(item.id.toString()), newName)
                }}
              >
                Change name
                <span className="iconify" data-icon="gg:pen"></span>
              </button>
            </>
          ) : (
            !noAttack ? (
              <s.Container fd={"row"} style={{ flexWrap: 'wrap' }} jc={"space-between"}>
                <select 
                  value={selectLip} 
                  onChange={(e) => {
                    e.preventDefault()
                    const selectId = e.target.value
                    const currentItem = userLips.find(item => item.id.toString() === selectId)
                    if (!currentItem) return 
                    if (solidityTime(currentItem) < jsTime) {
                      setSelectLip(selectId)
                    } else {
                      alert('You have to wait util your lip is ready!')
                    }
                  }}
                  className="select_your_lip"
                >
                  <option value={''}>Select your lip</option>
                  {
                    userLips.map((userLip) => {
                      return (
                        <option 
                          value={parseInt(userLip.id.toString())}
                          key={Math.random()}
                          dangerouslySetInnerHTML={{
                            __html: `ID: ${userLip.id.toString()}\nLEVEL: ${userLip.level}`
                          }}
                        />
                      )
                    })
                  }
                </select>
                <button 
                  className="attack_button"
                  disabled={loading} 
                  onClick={(e) => {
                    e.preventDefault()
                    handleAttack(parseInt(item.id.toString()))
                  }}
                >Attack</button>
              </s.Container>
            ) : <></>
          )
        }
      </s.Container>
    </s.Container>
  )
}

export default LipLayout