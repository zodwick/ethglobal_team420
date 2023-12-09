import { i32ToBytes, bytesToI32 } from './utils';

// Function to calculate factorial
function factorial(n: i32): i32 {
  let result: i32 = 1;
  while (n > 1) {
    result *= n;
    n -= 1;
  }
  return result;
}

/**
 * Main function of your program
 * @dev Receives the input of bytes in Uint8Array. Result must also be sent in bytes wrapped in Uint8Array
 *
 * @param input bytes in Uint8Array
 * @returns bytes in Uint8Array
 */
export const main = (input: Uint8Array): Uint8Array => {
  const number = bytesToI32(input);
  const fact = factorial(number);
  return i32ToBytes(fact);
};