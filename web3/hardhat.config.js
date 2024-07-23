import { config as dotenvConfig } from 'dotenv';

// Load environment variables from .env file
dotenvConfig();

// Define Hardhat configuration
const config = {
  zksolc: {
    version: "1.3.9",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    zksync_testnet: {
      url: "https://zksync2-testnet.zksync.dev",
      chainId: 280,
      zksync: true,
    },
    zksync_mainnet: {
      url: "https://zksync2-mainnet.zksync.io/",
      chainId: 324,
      zksync: true,
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 1115511, // Sepolia chain ID in hexadecimal format
    },
  },
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.17",
    defaultNetwork: "sepolia", // Specify the default network for Solidity compilation
    networks: {
      sepolia: { // Define the Sepolia network settings for Solidity
        url: "https://11155111.rpc.thirdweb.com", // Replace with the correct Sepolia RPC URL
        chainId: 0x1115511, // Sepolia chain ID in hexadecimal format
        accounts: [`0x${process.env.PRIVATE_KEY}`], // Ensure you have your PRIVATE_KEY set in your environment variables
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

export default config;
