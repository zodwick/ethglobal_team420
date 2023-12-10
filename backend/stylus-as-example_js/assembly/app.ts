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
  // Calculate the square root of each number
  const sqrtA = usqrt(a);
  const sqrtB = usqrt(b);

  // Return the sum of the square roots
  return sqrtA + sqrtB;
}

/**
 * Main function of your program
 * @dev Receives the input of bytes in Uint8Array. Result must also be sent in bytes wrapped in Uint8Array
 *
 * @param input bytes in Uint8Array
 * @returns bytes in Uint8Array
 */
export const main = (input: Uint8Array): Uint8Array => {
  // Assume the input is two 4-byte integers concatenated together
  const a = bytesToI32(input.slice(0, 4));
  const b = bytesToI32(input.slice(4, 8));

  const result = sqrtOfTwoNumbers(a, b);

  return i32ToBytes(result);
};
