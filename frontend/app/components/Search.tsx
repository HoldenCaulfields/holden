"use client";
import { useState } from "react";
import socket from "../utils/socket";

interface SearchProps {
    setSearchQuery: (query: string) => void;
}

export default function Search({ setSearchQuery }: SearchProps) {
    const [query, setQuery] = useState<string>("");

    const handleSearch = () => {
        if (!query.trim()) return;
        socket.emit("search", query);
        setSearchQuery(query);
        setQuery("");
    };

    return (
        <div className="min-h-screen flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-2xl">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={query}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            onChange={(e) => setQuery(e.target.value)}
                            className="block w-full pl-5 pr-12 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 sm:text-sm"
                        />
                        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                            <button
                                onClick={handleSearch}
                                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
                            >
                                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}