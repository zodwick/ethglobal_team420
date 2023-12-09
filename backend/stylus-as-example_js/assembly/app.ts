import { i32ToBytes, bytesToI32 } from './utils';

// Unsigned square root
function usqrt(n: i32): i32 {
  let x = n;
  let y = (x + 1) >> 1;
  while (y < x) {
    x = y;
    y = (x + n / x) >> 1;
  }
  return x;
}

function sqrtOfTwoNumbers(a: i32, b: i32): i32 {
  // Calculate the product of two numbers
  const product = a * b;

  // Return the square root of the product
  return usqrt(product);
}

/**
 * Main function of your program
 * @dev Receives the input of bytes in Uint8Array. Result must also be sent in bytes wrapped in Uint8Array
 *
 * @param input bytes in Uint8Array
 * @returns bytes in Uint8Array
 */
export const main = (input: Uint8Array): Uint8Array => {
  // Assume that the input contains two 4-byte integers
  if (input.length != 8) {
    throw new Error('Invalid input. Expected 8 bytes.');
  }

  // Extract the two integers from the input
  const a = bytesToI32(input.slice(0, 4));
  const b = bytesToI32(input.slice(4, 8));

  // Calculate the square root of the product of the two numbers
  const sqrtProduct = sqrtOfTwoNumbers(a, b);

  // Return the result as bytes
  return i32ToBytes(sqrtProduct);
};
