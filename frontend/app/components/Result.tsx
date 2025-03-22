"use client";
import { useEffect, useState } from "react";
import socket from "../utils/socket";

interface ResultProps {
    searchQuery: string;
}

interface Data {
    searchTerm: string;
    count: number;
    // other data
}

export default function Result({searchQuery}: ResultProps) {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        socket.on("updateResults", (data: Data) => {
            if (data.searchTerm === searchQuery) {
                setCount(data.count);
            }
        });

        return () => {
            socket.off("updateResults");
        }
    }, [searchQuery]);

    return (
        <div className="p-4">
            {searchQuery && (
                <p>There are <strong>{count}</strong> people are searching for "{searchQuery}"</p>
            )}
        </div>
    );
}