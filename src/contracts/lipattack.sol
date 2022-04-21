// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;
import "./liphelper.sol";

contract LipAttack is LipHelper {
  uint256 randNonce = 0;
  uint256 attackVictoryProbability = 70;

  function randMod(uint _modulus) internal returns(uint256) {
    randNonce = randNonce + 1;
    return uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % _modulus;
  }

  function attack(uint256 _lipId, uint256 _targetId) external onlyOwnerOf(_lipId) returns(int) {
    Lip storage myLip = lips[_lipId];
    Lip storage enemyLip = lips[_targetId];
    require(_isReady(myLip), "Your lip is not ready");
    require(myLip.level == enemyLip.level, "Only the same level can fight");
    uint256 rand = randMod(100);
    int isWin = -1;
    // if rand < 70 => you win else enemy win
    if (rand <= attackVictoryProbability) {
      myLip.winCount = myLip.winCount+1;
      myLip.level++;
      enemyLip.lossCount = enemyLip.lossCount + 1;
      isWin = 1;
    } else {
      myLip.lossCount = myLip.lossCount+1;
      enemyLip.winCount = enemyLip.winCount + 1;
    }
    _triggerCooldown(myLip);
    return isWin;
  }
}