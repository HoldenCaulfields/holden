"use client";
import { useState } from "react";
import Search from "./components/Search";
import Result from "./components/Result";
import ChatGroup from "./components/ChatGroup";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setHasSearched(true);
    setShowResults(true);
  };

  const handleCloseResults = () => {
    setShowResults(false);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 py-10 bg-[url('/bg.png')] bg-cover bg-center">
      <div className="w-full max-w-md px-4 md:px-8 lg:px-12">
        <Search setSearchQuery={handleSearch} />
        {hasSearched && (
          <div className="abolute top-0">
            {showResults && (
              <div className="relative rounded-lg shadow-md bg-white p-4">
                <button
                  onClick={handleCloseResults}
                  className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm"
                >
                  X
                </button>
                <Result searchQuery={searchQuery} />
                <ChatGroup searchQuery={searchQuery} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}