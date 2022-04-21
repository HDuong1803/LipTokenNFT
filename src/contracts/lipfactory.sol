// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract LipFactory is ERC721, Ownable {
  constructor() ERC721("Lip Token", "LPT") {}

  using SafeMath for uint256;

  event NewLipCreated(address indexed owner, uint256 id, uint256 dna);

  uint256 COUNTER;
  uint256 fee = 0.01 ether;
  uint256 cooldownTime = 1 days;
  uint256 dnaDigits = 16;
  uint256 dnaModulus = 10 ** dnaDigits;
  uint8 rarityModulus = 100;

  struct Lip {
      uint256 id;
      string name;
      uint256 dna;
      uint8 level;
      uint8 rarity;
      uint32 readyTime;
      uint16 winCount;
      uint16 lossCount;
  }
  Lip[] public lips;

  mapping (address => uint256) ownerLipCount;

  function _generateRandomNum(uint256 _mod) internal view returns (uint256) {
    uint256 randomNumber = uint256(
        keccak256(abi.encodePacked(block.timestamp, msg.sender))
    );
    return randomNumber % _mod;
  }

  function _createLip(string memory _name) internal {
      uint256 randomDna = _generateRandomNum(dnaModulus);
      uint8 randomRarity = uint8(_generateRandomNum(rarityModulus));
      lips.push(
        Lip(
          COUNTER,
          _name,
          randomDna,
          1,
          randomRarity,
          uint32(block.timestamp + 1 days),
          0, 0
        )
      );
      _safeMint(msg.sender, COUNTER);
      ownerLipCount[msg.sender] = ownerLipCount[msg.sender].add(1);
      emit NewLipCreated(msg.sender, COUNTER, randomDna);
      COUNTER = COUNTER.add(1);
  }

  function createRandomLip(string memory _name) public payable {
    require(msg.value >= fee);
    _createLip(_name);
  }
}
