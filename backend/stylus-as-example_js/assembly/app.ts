import { i32ToBytes, bytesToI32 } from './utils';

function sumOfTwoNumbers(a: i32, b: i32): i32 {
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
  const num1 = bytesToI32(input.slice(0, 4));
  const num2 = bytesToI32(input.slice(4, 8));
  const sum = sumOfTwoNumbers(num1, num2);
  return i32ToBytes(sum);
};
