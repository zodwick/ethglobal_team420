// Imports
import { ethers } from 'ethers';
// Constants
let PROGRAM_ADDRESS;
const RPC_URL = 'https://stylus-testnet.arbitrum.io/rpc';

// Initial setup
let stylusProvider;

// Main function
const main = async (inputNumber) => {
  console.log('');
  console.log('-----------------');
  console.log('| Start program |');
  console.log('-----------------');
  console.log('');

  console.log('-----------------');
  console.log(`Input: ${inputNumber}`);
  console.log('Calling program...');
 
  PROGRAM_ADDRESS = process.argv[2];

  stylusProvider = new ethers.JsonRpcProvider(RPC_URL);

  const resultBytes = await stylusProvider.call({
    to: PROGRAM_ADDRESS,
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

// Arguments check
if (process.argv.length !== 3) {
  console.log('Usage: npm run test:onchain <RPC_URL> <PROGRAM_ADDRESS> <inputNumber>');
  process.exit(1);
}

console.log('*************************');
console.log('* Stylus onchain tester *');
console.log('*************************');
console.log('');

// Getting arguments

const inputNumber = process.argv[3];

// Initializing provider with provided RPC_URL


main(inputNumber)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
