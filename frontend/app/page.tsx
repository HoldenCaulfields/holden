"use client";
import { useState } from "react";
import Search from "./components/Search";
import Result from "./components/Result";
import ChatGroup from "./components/ChatGroup";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Sailinger: Search and Chat</h1>

      <Search setSearchQuery={setSearchQuery} />
      <Result searchQuery={searchQuery} />
      {searchQuery && <ChatGroup searchQuery={searchQuery} />}
    </div>
  );
}