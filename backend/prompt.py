
systemReference = """
the code below is set up via the docs of arbitrum stylus library . do not change data types or other synthax only update the functions.

utils.ts:
export function i32ToBytes(value: i32): Uint8Array {
  const result = new Uint8Array(4);
  result[0] = (value >> 24) & 0xff; // Extract the first byte (most significant byte)
  result[1] = (value >> 16) & 0xff; // Extract the second byte
  result[2] = (value >> 8) & 0xff; // Extract the third byte
  result[3] = value & 0xff; // Extract the fourth byte (least significant byte)

  return result;
}

// TODO: Use bitwise operators to improve efficiency
export function bytesToI32(bytes: Uint8Array): i32 {
  if (bytes.length > 4) {
    throw new Error('Invalid Uint8Array length. Length should not be more than 4 bytes.');
  }

  const extendedBytes = new Uint8Array(4);
  for (let i = 0; i < 4; i++) {
    extendedBytes[i] = bytes.length > 3 - i ? bytes[bytes.length - (4 - i)] : 0x00;
  }

  let value: i32 = 0;

  for (let i = 0; i < 4; i++) {
    value += 0x100 ** i * extendedBytes[3 - i];
  }

  return value;
}


main.ts:
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

/**
 * Returns the max prime below or equal a given "number" using the Sieve of Eratosthenes algorithm
 * (Based on t-katsumura's implementation: https://github.com/t-katsumura/webassembly-examples-eratosthenes)
 * (Sieve of Eratosthenes explanation: https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes)
//  */




// function getMaxPrimeUpTo(number: i32): i32 {
//   // 0 here is meant to be interpreted as an error
//   if (number < 2) {
//     return 0;
//   }

//   // If 2 is passed, return 2
//   if (number == 2) {
//     return 2;
//   }

//   // Length of the sieve array
//   const length = (number - 1) / 2;

//   // Square root (max)
//   const maxNumberToCheck = usqrt(number);

//   // Sieve array (starting from 3, without multiples of 2) [3, 5, 7, 9, ...]
//   const sieve = new StaticArray<bool>(length).fill(true);

//   // Coordinates of the Sieve
//   let x: u32;
//   let y: u32;

//   for (let i = 0; i < length; i++) {
//     // Next number to check multiples for
//     x = 2 * (i + 1) + 1;

//     // No need to check multiples for numbers that are greater than
//     // the square root of the upper limit
//     if (x > maxNumberToCheck) {
//       break;
//     }

//     // Checking multiples of x
//     for (let j = i + 1; j < length; j++) {
//       if (!unchecked(sieve[j])) {
//         continue;
//       }

//       // Next multiple candidate
//       y = 2 * (j + 1) + 1;

//       // Candidate is multiple of x (not prime then)
//       if (y % x == 0) {
//         unchecked((sieve[j] = false));
//       }
//     }
//   }

//   // Get the highest prime number
//   let max_val: u32 = 2;
//   for (let i = length - 1; i >= 0; i--) {
//     if (unchecked(sieve[i])) {
//       max_val = 2 * (i + 1) + 1;
//       break;
//     }
//   }
//   return max_val;
// }



// function getMaxSquareRootUnderValue(limit: i32): i32 {
//   // 0 here is meant to be interpreted as an error
//   if (limit < 2) {
//     return 0;
//   }

//   // Length of the sieve array
//   const length = (limit - 1) / 2;

//   // Square root (max)
//   const maxNumberToCheck = usqrt(limit);

//   // Sieve array (starting from 3, without multiples of 2) [3, 5, 7, 9, ...]
//   const sieve = new StaticArray<bool>(length).fill(true);

//   // Coordinates of the Sieve
//   let x: u32;
//   let y: u32;

//   for (let i = 0; i < length; i++) {
//     // Next number to check multiples for
//     x = 2 * (i + 1) + 1;

//     // No need to check multiples for numbers that are greater than
//     // the square root of the upper limit
//     if (x > maxNumberToCheck) {
//       break;
//     }

//     // Checking multiples of x
//     for (let j = i + 1; j < length; j++) {
//       if (!unchecked(sieve[j])) {
//         continue;
//       }

//       // Next multiple candidate
//       y = 2 * (j + 1) + 1;

//       // Candidate is multiple of x (not fully square then)
//       if (y % x == 0) {
//         unchecked((sieve[j] = false));
//       }
//     }
//   }

//   // Get the largest fully square number under the given limit
//   let maxSquare: u32 = 1;
//   for (let i = length - 1; i >= 0; i--) {
//     if (unchecked(sieve[i])) {
//       maxSquare = (2 * (i + 1) + 1) ** 2;
//       break;
//     }
//   }

//   // Return the square root of the largest fully square number
//   return usqrt(maxSquare);
// }



function isPrime(n: i32): i32 {
  // 0 here is meant to be interpreted as not prime
  if (n < 2) {
    return 0;
  }

  // If 2 is passed, return 1 (prime)
  if (n == 2) {
    return 1;
  }

  // Square root (max)
  const maxNumberToCheck = usqrt(n);

  for (let i: i32 = 2; i <= maxNumberToCheck; i++) {
    // If n is divisible by any number between 2 and its square root, it's not prime
    if (n % i == 0) {
      return 0;
    }
  }

  // If no divisors were found, the number is prime
  return 1;
}
/**
 * Main function of your program
 * @dev Receives the input of bytes in Uint8Array. Result must also be sent in bytes wrapped in Uint8Array
 *
 * @param input bytes in Uint8Array
 * @returns bytes in Uint8Array
 */
export const main = (input: Uint8Array): Uint8Array => {
  const maxNumber = bytesToI32(input);
  // const maxPrime = getMaxSquareRootUnderValue(maxNumber);
  const maxPrime = isPrime(maxNumber);
  return i32ToBytes(maxPrime);
};
"""
