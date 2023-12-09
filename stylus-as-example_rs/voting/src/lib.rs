//! Implements a hello-world example for Arbitrum Stylus, providing a Solidity ABI-equivalent
//! Rust implementation of the Counter contract example provided by Foundry.
//! Warning: this code is a template only and has not been audited.
//! 
//! contract Counter {
//!     uint256 public number;
//!     function setNumber(uint256 newNumber) public {
//!         number = newNumber;
//!     }
//!     function increment() public {
//!         number++;
//!     }
//!     function addTwoNumbers(uint256 a, uint256 b) public view returns (uint256) {
//!         return counterInstance.add_numbers(a, b);
//!     }
//!     function castVote() public {
//!         counterInstance.cast_vote();
//!     }
//!     function getVote() public view returns (uint256) {
//!         return counterInstance.get_vote();
//!     }
//! }
//! 

// Only run this as a WASM if the export-abi feature is not set.
#![cfg_attr(not(feature = "export-abi"), no_main)]
extern crate alloc;

/// Initializes a custom, global allocator for Rust programs compiled to WASM.
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

/// Import the Stylus SDK along with alloy primitive types for use in our program.
use stylus_sdk::{alloy_primitives::U256, prelude::*};

// Define the entrypoint as a Solidity storage object, in this case a struct
// called Counter with a single uint256 value called number. The sol_storage! macro
// will generate Rust-equivalent structs with all fields mapped to Solidity-equivalent
// storage slots and types.
sol_storage! {
    #[entrypoint]
    pub struct Counter {
        uint256 number;
        uint256 vote_count;
    }
}

/// Define an implementation of the generated Counter struct, defining set_number,
/// increment, add_numbers, cast_vote, and get_vote methods using the features of the Stylus SDK.
#[external]
impl Counter {
    /// Gets the number from storage.
    pub fn number(&self) -> Result<U256, Vec<u8>> {
        Ok(self.number.get())
    }

    /// Sets a number in storage to a user-specified value.
    pub fn set_number(&mut self, new_number: U256) -> Result<(), Vec<u8>> {
        self.number.set(new_number);
        Ok(())
    }

    /// Increments number and updates its value in storage.
    pub fn increment(&mut self) -> Result<(), Vec<u8>> {
        let number = self.number.get();
        self.set_number(number + U256::from(1))
    }

    /// Adds two numbers and returns the result.
    pub fn add_numbers(&self, a: U256, b: U256) -> Result<U256, Vec<u8>> {
        let result = a + b;
        Ok(result)
    }

/// Casts a vote, incrementing the vote count.
    pub fn cast_vote(&mut self) -> Result<(), Vec<u8>> {
    let current_vote_count = self.vote_count.get();
    self.vote_count.set(current_vote_count + U256::from(1));
    Ok(())
}

    /// Gets the current vote count.
    pub fn get_vote(&self) -> Result<U256, Vec<u8>> {
        Ok(self.vote_count.get())
    }
}