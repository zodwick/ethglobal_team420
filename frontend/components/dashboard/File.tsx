"use client";

import { run } from "node:test";
import React, { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import CodeMirror from "@uiw/react-codemirror";
import { githubDark } from "@uiw/codemirror-theme-github";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { langs } from "@uiw/codemirror-extensions-langs";

export default function File() {
  const [send, setSend] = useState(false);
  const [address, setAddress] = useState("");
  const [scannedText, setScannedText] = useState(
    `// Only run this as a WASM if the export-abi feature is not set.\n#![cfg_attr(not(feature = \"export-abi\"), no_main)]\nextern crate alloc;\n\n/// Initializes a custom, global allocator for Rust programs compiled to WASM.\n#[global_allocator]\nstatic ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;\n\n/// Import the Stylus SDK along with alloy primitive types for use in our program.\nuse stylus_sdk::{alloy_primitives::U256, alloy_primitives::FixedBytes, crypto::keccak, prelude::*};\n// use sha3::{Digest, Keccak256};\n\n// Define the entrypoint as a Solidity storage object\nsol_storage! {\n    #[entrypoint]\n    pub struct Hasher {\n        bytes32 hash;\n    }\n}\n\n/// Define an implementation of the generated Hasher struct\n#[external]\nimpl Hasher {\n    pub fn hash(&self) -> Result<FixedBytes<32>, Vec<u8>> {\n        Ok(self.hash.get().0.into())\n    }\n\n    pub fn keccak_loop(&mut self, input_string: String, amount: U256) -> Result<(), Vec<u8>> {\n        let mut hash = input_string.as_bytes();\n        let mut hashed_value: FixedBytes<32>;\n        for _ in 0..amount.try_into().unwrap() {\n            hashed_value = keccak(hash);\n            hash = hashed_value.as_slice();\n        }\n\n        let hash_hex: Vec<String> = hash.iter().map(|b| format!(\"{:02x}\", b)).collect();\n        let hash_hex = hash_hex.join(\"\");\n\n        self.hash.set(hash_hex.parse::<FixedBytes<32>>().unwrap());\n        Ok(())\n}\n}`
  );

  useEffect(() => {
    const address = window.localStorage.getItem("address");
    setAddress(address);
  }
    , []);
  

  const obj = ``;
  const [value, setValue] = React.useState(
    '// Only run this as a WASM if the export-abi feature is not set.\n#![cfg_attr(not(feature = "export-abi"), no_main)]\nextern crate alloc;\n\n/// Initializes a custom, global allocator for Rust programs compiled to WASM.\n#[global_allocator]\nstatic ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;\n\n/// Import the Stylus SDK along with alloy primitive types for use in our program.\nuse stylus_sdk::{alloy_primitives::U256, alloy_primitives::FixedBytes, crypto::keccak, prelude::*};\n// use sha3::{Digest, Keccak256};\n\n// Define the entrypoint as a Solidity storage object\nsol_storage! {\n    #[entrypoint]\n    pub struct Hasher {\n        bytes32 hash;\n    }\n}\n\n/// Define an implementation of the generated Hasher struct\n#[external]\nimpl Hasher {\n    pub fn hash(&self) -> Result<FixedBytes<32>, Vec<u8>> {\n        Ok(self.hash.get().0.into())\n    }\n\n    pub fn keccak_loop(&mut self, input_string: String, amount: U256) -> Result<(), Vec<u8>> {\n        let mut hash = input_string.as_bytes();\n        let mut hashed_value: FixedBytes<32>;\n        for _ in 0..amount.try_into().unwrap() {\n            hashed_value = keccak(hash);\n            hash = hashed_value.as_slice();\n        }\n\n        let hash_hex: Vec<String> = hash.iter().map(|b| format!("{:02x}", b)).collect();\n        let hash_hex = hash_hex.join("");\n\n        self.hash.set(hash_hex.parse::<FixedBytes<32>>().unwrap());\n        Ok(())\n}\n}'
  );
  const onChange = React.useCallback(
    (val: React.SetStateAction<string>, viewUpdate: any) => {
      console.log("val:", val);
      setValue(val);
    },
    []
  );
  return (
    <div className="flex justify-start flex-col w-full gap-4 items-center mt-12">
      <div className="gap-2 mb-5 flex flex-col justify-start item-center">
        <h1 className="font-body font-bold text-3xl">
          Explain What contract you need{" "}
        </h1>
        <p className="item-center content-center flex justify-center"></p>
      </div>
      <div className="px-12 w-full">
        <div className="flex w-full  border-2 rounded-2xl mt-0 bg-slate-50 justify-between gap-5">
          <textarea
            placeholder="Enter your smart contract idea"
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 "
          ></textarea>
        </div>{" "}
        <Select
          variant="bordered"
          label="Select an animal"
          className="max-w-xs"
        >
          <SelectItem>Dog</SelectItem>
        </Select>
      </div>

      <div className="flex gap-1 w-1/2 flex-col mt-3">
        <button className="w-full bg-blue-500 text-white  rounded-2xl py-2 ">
          Share to a doctor
        </button>
      </div>
      {/* <div className="w-full">
        <div className=" w-full  flex items-center justify-center ">
          <div className="mx-5 w-full bg-gray-800 shadow-2xl rounded-lg ">
            <div id="header-buttons" className="py-3 px-4 flex">
              <div className="rounded-full w-3 h-3 bg-red-500 mr-2"></div>
              <div className="rounded-full w-3 h-3 bg-yellow-500 mr-2"></div>
              <div className="rounded-full w-3 h-3 bg-green-500"></div>
            </div>
            <div
              id="code-area"
              className="py-4  w-full px-4 mt-1 text-white text-xl"
            >
              <textarea className="w-full bg-gray-800 border-none"></textarea>
            </div>
          </div>
        </div>
      </div> */}
      <div className="w-full rounded-xl px-14 ">
        <CodeMirror
          value={value}
          extensions={[langs.rust()]}
          onChange={onChange}
          theme={githubDark}
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
}
