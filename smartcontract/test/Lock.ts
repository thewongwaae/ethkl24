// import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
// import { expect } from "chai";
// import { ethers } from "hardhat";

// describe("Lock", function () {
//   async function deployOneYearLockFixture() {
//     const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;

//     const lockedAmount = ethers.parseEther("1");
//     const unlockTime = BigInt((await ethers.provider.getBlockNumber() * 10) + ONE_YEAR_IN_SECS);

//     // Contracts are deployed using the first signer/account by default
//     const [owner, otherAccount] = await ethers.getSigners();

//     const Lock = await ethers.getContractFactory("Lock");
//     const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//     return { lock, unlockTime, lockedAmount, owner, otherAccount };
//   }

//   describe("Deployment", function () {
//     it("Should set the right unlockTime", async function () {
//       const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

//       expect(await lock.unlockTime()).to.equal(unlockTime);
//     });

//     it("Should set the right owner", async function () {
//       const { lock, owner } = await loadFixture(deployOneYearLockFixture);

//       expect(await lock.owner()).to.equal(owner.address);
//     });

//     it("Should receive and store the funds to lock", async function () {
//       const { lock, lockedAmount } = await loadFixture(deployOneYearLockFixture);

//       expect(await ethers.provider.getBalance(lock.getAddress())).to.equal(lockedAmount);
//     });

//     it("Should fail if the unlockTime is not in the future", async function () {
//       const latestTime = BigInt(await ethers.provider.getBlockNumber() * 10);
//       const Lock = await ethers.getContractFactory("Lock");
//       await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
//         "Unlock time should be in the future"
//       );
//     });
//   });

//   describe("Withdrawals", function () {
//     describe("Validations", function () {
//       it("Should revert with the right error if called too soon", async function () {
//         const { lock } = await loadFixture(deployOneYearLockFixture);

//         await expect(lock.withdraw()).to.be.revertedWith(
//           "You can't withdraw yet"
//         );
//       });

//       it("Should revert with the right error if called from another account", async function () {
//         const { lock, unlockTime, otherAccount } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         await ethers.provider.send("evm_setNextBlockTimestamp", [unlockTime]);
//         await ethers.provider.send("evm_mine", []);

//         await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
//           "You aren't the owner"
//         );
//       });

//       it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
//         const { lock, unlockTime } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         await ethers.provider.send("evm_setNextBlockTimestamp", [unlockTime]);
//         await ethers.provider.send("evm_mine", []);

//         await expect(lock.withdraw()).not.to.be.reverted;
//       });
//     });

//     describe("Events", function () {
//       it("Should emit an event on withdrawals", async function () {
//         const { lock, unlockTime, lockedAmount } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         await ethers.provider.send("evm_setNextBlockTimestamp", [unlockTime]);
//         await ethers.provider.send("evm_mine", []);

//         await expect(lock.withdraw())
//           .to.emit(lock, "Withdrawal")
//           .withArgs(lockedAmount, when); // We accept any value as "when" parameter
//       });
//     });
//   });
// });

const {
  time,
  loadFixture
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lock", function () {
  async function runEveryTime() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

    // Wait for the contract to be deployed
    await lock.deployed();

    return { lock, unlockTime, lockedAmount, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should check unlock time", async function () {
      const { lock, unlockTime } = await loadFixture(runEveryTime);
      expect(await lock.unlockTime()).to.equal(unlockTime);
    });

    it("Should be the owner", async function() {
      const { lock, owner } = await loadFixture(runEveryTime);
      expect(await lock.owner()).to.equal(owner.address);
    });

    it("Should receive and store the funds to lock", async function() {
      const { lock, lockedAmount } = await loadFixture(runEveryTime);
      expect(await ethers.provider.getBalance(lock.address)).to.equal(lockedAmount);
    });
  });

  // You can keep the beforeEach if you want, but it's not necessary for these tests
  // beforeEach(async function () {
  //   console.log("Running setup...");
  //   await loadFixture(runEveryTime);
  // });

  // it("should log setup values", async function () {
  //   console.log("Test running...");
  // });
});