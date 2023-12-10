"use client";

import { run } from "node:test";
import React, { useState, useEffect } from "react";
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import CodeMirror from "@uiw/react-codemirror";
import { githubDark } from "@uiw/codemirror-theme-github";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { langs } from "@uiw/codemirror-extensions-langs";
import axios from "axios"; // Import Axios
import { Toaster, toast } from "react-hot-toast";

import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";

export default function Dashboard() {
  const [address, setAddress] = useState<String>("");

  const [isLoadingc, setIsLoadingc] = useState(false);
  const [isLoadingd, setIsLoadingd] = useState(false);
  const [isLoadingg, setIsLoadingg] = useState(false);
  const [isLoadingt, setIsLoadingt] = useState(false);
  const [isLoadingi, setIsLoadingi] = useState(false);

  useEffect(() => {
    const address = window.localStorage.getItem("address");
    setAddress(address || "");
  }, []);
  console.log("Address:", address);

  const handleGenerateContract = (prompt: string, language: string) => {
    setIsLoadingg(true);
    // Your code to make the Axios request
    const requestData = {
      prompt: prompt || "simple hash function",
      language: language || "Rust",
    };

    console.log("Request Data:", requestData);

    axios
      .post("https://e1bc-14-195-9-98.ngrok-free.app/genCode", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response: { data: { Code: React.SetStateAction<string> } }) => {
        setValue(response.data.Code);
        setIsLoadingg(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingg(false);
      });
  };

  const [CheckContractResponse, setCheckContractResponse] = useState(null);
  const handleCheckContract = (prompt: string, language: string) => {
    setIsLoadingc(true);
    // Your code to make the Axios request
    const requestData = {
      prompt: prompt || "simple hash function",
      language: language || "Rust",
    };

    axios
      .post("https://e1bc-14-195-9-98.ngrok-free.app/check", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const parseddata = JSON.parse(response.data.data);
        setCheckContractResponse(parseddata);
        setIsCheckContract(true);
        toast.success("Successfully checked!");
        setIsLoadingc(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingc(false);
      });
  };

  const [DeployContractResponse, setDeployContractResponse] = useState(null);
  const handleDeployContract = (prompt: string, language: string) => {
    setIsLoadingd(true);
    console.log("Deploy Contract");
    // Your code to make the Axios request
    const requestData = {
      prompt: prompt || "simple hash function",
      language: language || "Rust",
    };

    axios
      .post("https://e1bc-14-195-9-98.ngrok-free.app/deploy", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response:", response);
        const parseddata = JSON.parse(response.data);
        setDeployContractResponse(parseddata);
        toast.success("Successfully Deployed!");
        setIsLoadingd(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingd(false);
      });
  };
  const languages = [
    "Typescript",
    "Rust",
    "GO",
    "C",
    "C++",
    "Python",
    "Java",
    "Javascript",
    "Elixr",
  ];
  console.log("CheckContractResponse:", CheckContractResponse);
  const [selectedLanguage, setSelectedLanguage] = useState("Rust");
  const [isCheckContract, setIsCheckContract] = useState(false);
  const [isDeployContract, setIsDeployContract] = useState(false);
  const [isTestContract, setIsTestContract] = useState(false);

  const obj = ``;
  const [currentPrompt, setCurrentPrompt] = useState(obj);
  const [value, setValue] = React.useState("");
  const onChange = React.useCallback(
    (val: React.SetStateAction<string>, viewUpdate: any) => {
      console.log("val:", val);
      setValue(val);
    },
    []
  );

  const [testvalue, setTestValue] = useState("0");
  const [chainadress, setChainAdress] = useState("0x0");
  const [testResponse, setTestResponse] = useState(null);
  const handleTest = (prompt: string, language: string) => {
    setIsLoadingt(true);
    console.log("Deploy Contract");
    // Your code to make the Axios request
    const requestData = {
      input: testvalue,
      program: chainadress,
    };
    console.log("Request Data:", requestData);

    axios
      .post("https://1ad7-14-195-9-98.ngrok-free.app/onchain", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setTestResponse(response.data.output);
        toast.success("Successfully tested!");
        setIsLoadingt(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingt(false);
      });
  };

  const [ipfshash, setIPFSHash] = useState("");
  const handleIPFS = (prompt: string, language: string) => {
    setIsLoadingi(true);
    console.log("ipfs Contract");
    // Your code to make the Axios request
    const requestData = {
      prompt: prompt,
      language: language,
    };
    console.log("Request Data:", requestData);

    axios
      .post("https://1ad7-14-195-9-98.ngrok-free.app/ipfs", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setIPFSHash(response.data.ipfs_hash);
        toast.success("Successfully stored!");
        setIsLoadingi(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingi(false);
      });
  };
  return (
    <div className="bg-[#141618] flex min-h-screen w-full">
      <div>
        <Toaster />
      </div>

      <div
        className="flex w-full bg-[#141618] sm:w-64 m-0 p-0"
        style={{ flex: 0.6 }}
      >
        <Sidebar />
      </div>
      <div
        className="flex w-full bg-white sm:w-64 m-4 rounded-3xl p-0"
        style={{ flex: 3 }}
      >
        <div className="flex w-full sm:w-64 m-0 p-0" style={{ flex: 3 }}>
          <div className="flex justify-start flex-col w-full gap-4 items-center mt-12">
            <div className="gap-2 mb-5 flex flex-col justify-center item-center">
              <h1 className="font-body4 items-center font-bold text-3xl  text-blue-950">
                Explain the contract you need{" "}
              </h1>
              <p className="item-center content-center text-black flex justify-center font-body1">
                Your wallet Id: {address}
              </p>
            </div>
            <div className="px-12 w-full">
              <div className="flex w-full  border-2 rounded-2xl mt-0 bg-slate-50 justify-between gap-5">
                <textarea
                  placeholder="Enter your smart contract idea"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 text-gray-600 "
                  onChange={(e) => {
                    setCurrentPrompt(e.target.value);
                  }}
                ></textarea>
              </div>{" "}
              <Select
                variant="bordered"
                label="Select Language"
                className=" mt-3 w-full text-gray-500"
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => {
                  setSelectedLanguage(e.target.value);
                }}
              >
                {languages.map((lang) => (
                  <SelectItem key={lang} className="text-gray-500">
                    {lang}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="flex gap-1 px-12 justify-start items-start w-full flex-col mt-3">
              <Button
                isLoading={isLoadingg}
                className="w-fit px-8 font-body4 bg-blue-500 text-white  rounded-2xl py-2 "
                onClick={() =>
                  handleGenerateContract(currentPrompt, selectedLanguage)
                }
              >
                Generate Contract
              </Button>
            </div>

            <div className="w-full rounded-xl px-14 ">
              {value ? (
                <CodeMirror
                  value={value}
                  extensions={[langs.rust()]}
                  onChange={onChange}
                  theme={githubDark}
                  height="100%"
                  width="100%"
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <div
          className="flex w-full rounded-r-3xl bg-slate-200 sm:w-64 m-0 p-0"
          style={{ flex: 1.2 }}
        >
          <div className="flex flex-col  items-left py-6 px-7 mr-4 w-full justify-between">
            <div className="">
              {!isCheckContract && (
                <div className="flex gap-1 w-full flex-col mt-3">
                  <Button
                    isLoading={isLoadingc}
                    className="w-full bg-blue-500 font-body4 text-white  rounded-2xl py-2 "
                    onClick={() =>
                      handleCheckContract(currentPrompt, selectedLanguage)
                    }
                  >
                    Check Contract
                  </Button>
                </div>
              )}
              {isCheckContract && (
                <div className=" text-gray-700 bg-white rounded-xl border border-green-600 p-3 break-words overscroll-y-none py-3">
                  {" "}
                  {CheckContractResponse &&
                    Object.entries(CheckContractResponse).map(
                      ([key, value]) => (
                        <div key={key} className=" py-2 ">
                          <h2 className=" font-semibold  font-body text-medium">
                            {key}
                          </h2>
                          {value != null ? (
                            <p className="text-green-700 text-sm font-semibold">
                              {value as string}
                            </p>
                          ) : (
                            <p className="text-red-500">False</p>
                          )}{" "}
                        </div>
                      )
                    )}
                </div>
              )}
              {isCheckContract && (
                <div className="flex gap-1 w-full flex-col mt-3">
                  <Button
                    isLoading={isLoadingd}
                    className="w-full bg-blue-500 font-body4 text-white  rounded-2xl py-2 "
                    onClick={() =>
                      handleDeployContract(currentPrompt, selectedLanguage)
                    }
                  >
                    Deploy Contract
                  </Button>
                </div>
              )}

              {DeployContractResponse && (
                <div className=" text-gray-700 mt-3 bg-white rounded-xl border border-green-600 p-3 break-words overscroll-y-none py-3">
                  {Object.entries(DeployContractResponse).map(
                    ([key, value]) => (
                      <div key={key} className=" py-2 ">
                        <h2 className=" font-semibold  font-body text-medium">
                          {key}
                        </h2>
                        {value != null ? (
                          <p className="text-green-700 text-sm font-semibold">
                            {value as string}
                          </p>
                        ) : (
                          <p className="text-red-500">False</p>
                        )}{" "}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
            {!isTestContract && (
              <div>
                {" "}
                <div className="flex gap-1 w-full flex-col mt-3">
                  <button
                    className="w-full bg-blue-500 font-body4 text-white  rounded-2xl py-2 "
                    onClick={() => setIsTestContract(true)}
                  >
                    Test Contract{" "}
                  </button>
                </div>
              </div>
            )}
            {isTestContract && (
              <div className=" py-7 mt-6 bg-[#001d32] rounded-xl w-full px-5 mb-5">
                <div className="flex flex-col">
                  <Input
                    type="text"
                    variant="flat"
                    placeholder="Enter Contract Address"
                    className="w-full text-black mt-2 font-body4 rounded-2xl  "
                    onChange={(e: any) => {
                      setChainAdress(e.target.value);
                    }}
                  />
                  <Input
                    type="text"
                    variant="flat"
                    placeholder="Enter value to test"
                    className="w-full text-black mt-2 mb-2 font-body4 rounded-2xl  "
                    onChange={(e: any) => {
                      setTestValue(e.target.value);
                    }}
                  />
                  <Button
                    isLoading={isLoadingt}
                    className="w-full bg-blue-500 font-body4 text-white  rounded-2xl py-3 "
                    onClick={() => handleTest(currentPrompt, selectedLanguage)}
                  >
                    Test
                  </Button>
                  <Button
                    isLoading={isLoadingi}
                    className="w-full bg-blue-500 mt-2 font-body4 text-white  rounded-2xl py-3 "
                    onClick={() => handleIPFS(currentPrompt, selectedLanguage)}
                  >
                    Store to lighthouse
                  </Button>
                  {testResponse && (
                    <p className="text-green-800  px-2 py-2 border border-green-400 bg-white rounded-xl mt-3">
                      {testResponse}
                    </p>
                  )}{" "}
                  {ipfshash && (
                    <p className="text-green-800  px-2 py-2 border  break-words border-green-400 bg-white rounded-xl mt-3">
                      {ipfshash}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
