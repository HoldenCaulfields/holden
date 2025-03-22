"use client";
import { useState } from "react";
import socket from "../utils/socket";

interface SearchProps {
    setSearchQuery: (query: string) => void;
}

export default function Search({setSearchQuery}: SearchProps) {
    const [query, setQuery] = useState<string>("");

    const handleSearch = () => {
        if (!query.trim()) return;
        socket.emit("search", query);
        setSearchQuery(query);
        setQuery("");
    };

    return (
        <div className="p-4">
            <input type="text" placeholder="Search..." value={query} 
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleSearch} className="btn btn-primary">Search</button>
        </div>
    );
}