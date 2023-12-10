/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useCallback } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function page() {
    const [address, setAddress] = useState("");
    const router = useRouter();
  const _connectToMetaMask = useCallback(async () => {
   
    const ethereum: any = (window as Window & typeof globalThis).ethereum;
    // Check if MetaMask is installed
    if (typeof ethereum !== "undefined") {
      try {
        // Request access to the user's MetaMask accounts
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        // Get the connected Ethereum address
        const address = accounts[0];
        // Check address in console of web browser
        console.log("connected to MetaMask with address: ", address);
        // Set the MetaMask account to the component state
        setAddress(address);
        window.localStorage.setItem("address", address);
        router.push("/dashboard");
      } catch (error: Error | any) {
        alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
      }
    } else {
      alert("MetaMask not installed");
    }
  }, []);

  return (
    <div className="grid px-4 py-24 bg-[#001d32] min-h-screen sm:px-6 lg:px-8 place-items-center">
      <div className="relative w-full max-w-xl mx-auto overflow-hidden bg-white rounded-xl">
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-center">
            <div className="flex-1 justify-center items-center">
              <p className="text-xl text-center font-body4 font-bold text-gray-900">
                Connect your wallet
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-6 sm:mt-16">
            <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-1">
              <div className="overflow-hidden transition-all duration-200 bg-white border border-gray-900 cursor-pointer rounded-xl hover:bg-gray-50">
                <div className="px-4 py-5">
                  <img
                    className="w-auto h-8 mx-auto"
                    src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/connect-wallet/1/metamask-logo.png"
                    alt=""
                  />
                  <p className="mt-3 text-sm font-bold text-gray-900">
                    Metamask
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={_connectToMetaMask}
              className="inline-flex items-center justify-center w-full px-6 py-4 text-xs font-bold tracking-widest text-white uppercase transition-all duration-200 bg-gray-900 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
