"use client";

import React, { useState } from "react";

export default function Rightbar() {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    blood_group: "",
    age: "",
    gender: "",
  });

  const handleInputChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="flex flex-col items-left py-6 px-7 mr-4 w-full justify-start">
      <h2 className="font-body text-lg font-semibold">Enter your Details</h2>

    </div>
  );
}
