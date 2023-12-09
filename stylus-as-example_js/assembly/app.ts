import { i32ToBytes, bytesToI32 } from './utils';

function sumOfDigits(n: i32): i32 {
  let sum: i32 = 0;
  let num: i32 = n;

  while (num > 0) {
    sum += num % 10;
    num = num / 10;
  }

  return sum;
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
  const sum = sumOfDigits(number);
  return i32ToBytes(sum);
};
