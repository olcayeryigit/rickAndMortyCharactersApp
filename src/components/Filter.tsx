"use client";
import React, { useState } from "react";

type FilterProps = {
  onFilterChange: (filters: { status: string; gender: string }) => void;
};

const Filters: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [status, setStatus] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    onFilterChange({ status: newStatus, gender });
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newGender = event.target.value;
    setGender(newGender);
    onFilterChange({ status, gender: newGender });
  };

  return (
    <div className="flex justify-center gap-6 mb-12 text-white">
      <div className="flex flex-col">
        <label htmlFor="status" className="text-xl font-semibold mb-2">Status</label>
        <select
          id="status"
          value={status}
          onChange={handleStatusChange}
          className="border-2 border-white p-4 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <option value="">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="gender" className="text-xl font-semibold mb-2">Gender</label>
        <select
          id="gender"
          value={gender}
          onChange={handleGenderChange}
          className="border-2 border-white p-4 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
