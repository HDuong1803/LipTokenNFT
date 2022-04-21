const { assert } = require('chai');

const LipToken = artifacts.require('./lipattack.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Lip Token', (accounts) => {
  let lipToken;

  before(async () => {
    lipToken = await LipToken.deployed();
  });

  describe('deployment', () => {
    it('deploy successfully', async () => {
      const address = await lipToken.address;
      assert.notEqual(address, "0x0");
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });


    it('has a name', async () => {
      const name = await lipToken.name();
      assert.equal(name, "Lip Token");
    })
  });

  // describe("lip token", () => {
  //   let result;
  //   before(async () => {
  //     result = await LipToken.createRandomLip("testing");
  //   });

  //   it("create lip", async () => {
  //     // SUCESS
  //     const event = result.logs[0].args;
  //     console.log(event.id.toNumber());
  //     assert.equal(event.id.toNumber(), 0, 'id is correct');
  //     assert.equal(event.name, "testing", 'name is correct');
  //   });

  //   //check from Struct
  //   it('lists lips', async () => {
  //     const lip = await LipToken.lips(0);
  //     assert.equal(lip.id.toNumber(), 0, 'id is correct');
  //     assert.equal(lip.name, "testing", 'name is correct');
  //   });
  // })
})
