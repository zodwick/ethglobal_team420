// Imports
import { ethers } from 'ethers';

// Function to interact with the program
const interactWithProgram = async (rpcUrl, programAddress, inputNumber) => {
  const provider = new ethers.JsonRpcProvider(rpcUrl);

  console.log('');
  console.log('-----------------');
  console.log('| Start program |');
  console.log('-----------------');
  console.log('');

  console.log('-----------------');
  console.log(`Input: ${inputNumber}`);
  console.log('Calling program...');

  const resultBytes = await provider.call({
    to: programAddress,
    data: ethers.toBeHex(inputNumber),
  });
  const result = parseInt(resultBytes, 16);

  console.log(`Result: ${result}`);
  console.log('-----------------');
  console.log('');
};

////////////////
// Init point //
////////////////

// Constants
const PROGRAM_ADDRESS = '0x177Ec94a71deC8139500b0AfCC0ff10eC91DF1c5';
const RPC_URL = 'https://stylus-testnet.arbitrum.io/rpc';
const inputNumber = '56'; // Hardcoded input value

// Call the function with the specified constants
interactWithProgram(RPC_URL, PROGRAM_ADDRESS, inputNumber)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



