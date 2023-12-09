"use client";

import { run } from "node:test";
import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import CodeMirror from "@uiw/react-codemirror";
import { githubDark } from "@uiw/codemirror-theme-github";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { langs } from "@uiw/codemirror-extensions-langs";
import axios from "axios"; // Import Axios

import Sidebar from "./Sidebar";
import File from "./File";
import Rightbar from "./Rightbar";

export default function Dashboard() {
  const handleGenerateContract = (prompt: string, language: string) => {
    // Your code to make the Axios request
    const requestData = {
      prompt: prompt,
      language: language,
    };

    console.log("Request Data:", requestData);

    axios
      .post("http://127.0.0.1:5000/genCode", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setValue(response.data.Code);
      })
      .catch((error) => {
        console.log(error);
        // Handle the error as needed
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
  const [send, setSend] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Typescript");

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
  return (
    <div className="bg-[#141618] flex min-h-screen w-full">
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
            <div className="gap-2 mb-5 flex flex-col justify-start item-center">
              <h1 className="font-body font-bold text-3xl  text-blue-950">
                Explain the contract you need{" "}
              </h1>
              <p className="item-center content-center flex justify-center"></p>
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
                className="max-w-xs mt-2 text-gray-500"
                onChange={(e) => {
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

            <div className="flex gap-1 w-1/2 flex-col mt-3">
              <button
                className="w-full bg-blue-500 text-white  rounded-2xl py-2 "
                onClick={() =>
                  handleGenerateContract(currentPrompt, selectedLanguage)
                }
              >
                Generate Contract
              </button>
            </div>

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
        </div>
        <div
          className="flex w-full rounded-r-3xl bg-slate-200 sm:w-64 m-0 p-0"
          style={{ flex: 1.2 }}
        >
          <Rightbar />
        </div>
      </div>
    </div>
  );
}
