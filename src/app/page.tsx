"use client";
import React, { useState, useEffect } from "react";
import Filters from "@/components/Filter";
import CharacterList from "@/components/CharacterList";
import { BASE_URL } from "@/lib/api";
import Image from "next/image";

async function getCharacters(status: string | null, gender: string | null, page: number) {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (gender) params.append("gender", gender);
  params.append("page", page.toString()); // Sayfa numarasını ekle

  const res = await fetch(`${BASE_URL}/character?${params.toString()}`, {
    next: { revalidate: 10 },
  });
  if (!res.ok) throw new Error("Failed to fetch characters");

  return res.json();
}

export default function Home() {
  const [filters, setFilters] = useState({ status: "", gender: "" });
  const [characters, setCharacters] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

  const handleFilterChange = (newFilters: { status: string; gender: string }) => {
    setFilters(newFilters);
    setPagination({ currentPage: 1, totalPages: 1 }); // Filtre değiştiğinde sayfa sıfırlanır
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacters(filters.status, filters.gender, pagination.currentPage);
      setCharacters(data.results);
      setPagination({
        currentPage: data.info.pages > 0 ? pagination.currentPage : 1,
        totalPages: data.info.pages,
      });
    };

    fetchData();
  }, [filters, pagination.currentPage]);

  const goToNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination({ ...pagination, currentPage: pagination.currentPage + 1 });
    }
  };

  const goToPrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination({ ...pagination, currentPage: pagination.currentPage - 1 });
    }
  };

  return (
    <main className="p-8 bg-gradient-to-br from-indigo-900 to-purple-700 min-h-screen">
      <div className="relative w-full h-28">
        <Image fill className="object-contain" src="/image/img1.png"/>
      </div>
      <h1 className="text-6xl font-bold text-white text-center tracking-wide mb-8">
        Rick and Morty Characters
      </h1>
      <Filters onFilterChange={handleFilterChange} />
      <CharacterList characters={characters} />
      <div className="mt-8 flex justify-between items-center text-white">
        <button
          onClick={goToPrevPage}
          disabled={pagination.currentPage === 1}
          className="p-4 bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-purple-800 disabled:bg-gray-700 transition-all transform  shadow-xl w-28"
        >
        Previous
        </button>
        <span className="text-xl font-semibold">Page {pagination.currentPage} of {pagination.totalPages}</span>
        <button
          onClick={goToNextPage}
          disabled={pagination.currentPage === pagination.totalPages}
          className="p-4 bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-purple-800 disabled:bg-gray-700 transition-all transform  shadow-xl w-28"
        >
          Next 
        </button>
      </div>
    </main>
  );
}
