import { i32ToBytes, bytesToI32 } from './utils';

/**
 * Function to add two numbers
 * @param a first number
 * @param b second number
 * @returns sum of a and b
 */
function add(a: i32, b: i32): i32 {
  return a + b;
}

/**
 * Main function of your program
 * @dev Receives the input of bytes in Uint8Array. Result must also be sent in bytes wrapped in Uint8Array
 *
 * @param input bytes in Uint8Array
 * @returns bytes in Uint8Array
 */
export const main = (input: Uint8Array): Uint8Array => {
  // Assuming the input contains two 4-byte integers
  if (input.length != 8) {
    throw new Error('Invalid input. Expected two 4-byte integers.');
  }

  // Extract the two numbers from the input
  const a = bytesToI32(input.slice(0, 4));
  const b = bytesToI32(input.slice(4, 8));

  // Compute the sum
  const sum = add(a, b);

  // Return the sum as bytes
  return i32ToBytes(sum);
};
