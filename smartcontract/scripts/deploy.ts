import { ethers, run, network } from "hardhat";

async function main() {
  console.log("Deploying Vote contract to Scroll Sepolia...");

  // Get the Contract Factory
  const Vote = await ethers.getContractFactory("Vote");

  // Deploy the contract
  const vote = await Vote.deploy();

  // Wait for the contract to be deployed
  await vote.waitForDeployment();

  const deployedAddress = await vote.getAddress();
  console.log("Vote contract deployed to:", deployedAddress);

  // Optionally, you can add a delay here to ensure the contract is fully propagated
  console.log("Waiting for contract to be fully propagated...");
  await new Promise(resolve => setTimeout(resolve, 60000)); // 60 seconds delay

  // Verify the contract
  if (network.name === "scrollSepolia") {
    console.log("Verifying contract on Scrollscan...");
    try {
      await run("verify:verify", {
        address: deployedAddress,
        constructorArguments: [],
      });
      console.log("Contract verified successfully");
    } catch (error) {
      console.error("Error verifying contract:", error);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});