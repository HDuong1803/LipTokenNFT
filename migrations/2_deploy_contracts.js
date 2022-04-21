const LipToken = artifacts.require("lipattack");

module.exports = function (deployer) {
  deployer.deploy(LipToken);
};
