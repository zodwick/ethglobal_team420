// Only run this as a WASM if the export-abi feature is not set.
#![cfg_attr(not(feature = "export-abi"), no_main)]
extern crate alloc;

/// Initializes a custom, global allocator for Rust programs compiled to WASM.
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

/// Import the Stylus SDK along with alloy primitive types for use in our program.
use stylus_sdk::{alloy_primitives::U256, alloy_primitives::FixedBytes, crypto::keccak, prelude::*};
// use sha3::{Digest, Keccak256};

// Define the entrypoint as a Solidity storage object
sol_storage! {
    #[entrypoint]
    pub struct Hasher {
        bytes32 hash;
    }
}

/// Define an implementation of the generated Hasher struct
#[external]
impl Hasher {
    pub fn hash(&self) -> Result<FixedBytes<32>, Vec<u8>> {
        Ok(self.hash.get().0.into())
    }

    pub fn keccak_loop(&mut self, input_string: String, amount: U256) -> Result<(), Vec<u8>> {
        let mut hash = input_string.as_bytes();
        let mut hashed_value: FixedBytes<32>;
        for _ in 0..amount.try_into().unwrap() {
            hashed_value = keccak(hash);
            hash = hashed_value.as_slice();
        }

        let hash_hex: Vec<String> = hash.iter().map(|b| format!("{:02x}", b)).collect();
        let hash_hex = hash_hex.join("");

        self.hash.set(hash_hex.parse::<FixedBytes<32>>().unwrap());
        Ok(())
    }
}