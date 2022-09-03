const { expect } = require('chai');
const myJson = require('../artifacts/contracts/BaseToken.sol/BaseToken.json')

describe("GreenTokens", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContract() {    

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory("GreenTokens");
    const contract = await Contract.deploy();

    return { contract, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { contract, owner, otherAccount } = await deployContract();

      await contract._addRoll(owner.address)
      await contract.createProject("Green Tokens", 2000, "htts//pinata/metadata.json")
      const project = await contract.project(0)      
      
      expect(project.projectName).to.equal("Green Tokens");
    });

    it("Should set the right unlockTime", async function () {
      const { contract, owner, otherAccount } = await deployContract();

      await contract._addRoll(owner.address)
      await contract.createProject("Green Tokens", 2000, "htts//pinata/metadata.json")
      const project = await contract.project(0)
      const baseToken = new ethers.Contract(project.tokens, myJson.abi, ethers.provider)

      console.log(baseToken)

      const uri = await baseToken.uri(0)
      console.log(uri)

      const NFT = await baseToken.functions.balanceOf(owner.address, 0)
      console.log('NFT', NFT)
      const Token = await baseToken.functions.balanceOf(owner.address, 1)
      console.log('Token', Token)

      expect(project.projectName).to.equal("Green Tokens");
    });
  });

});
