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

function isNotPrime(n: i32): i32 {
  // 0 here is meant to be interpreted as prime
  if (n < 2) {
    return 0;
  }

  // If 2 is passed, return 0 (prime)
  if (n == 2) {
    return 0;
  }

  // Square root (max)
  const maxNumberToCheck = usqrt(n);

  for (let i: i32 = 2; i <= maxNumberToCheck; i++) {
    // If n is divisible by any number between 2 and its square root, it's not prime
    if (n % i == 0) {
      return 1;
    }
  }

  // If no divisors were found, the number is prime
  return 0;
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
  const result = isNotPrime(number);
  return i32ToBytes(result);
};
