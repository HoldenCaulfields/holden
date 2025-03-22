"use client";
import { useEffect, useState, useRef } from "react";
import socket from "../utils/socket";

interface ChatGroupProps {
    searchQuery: string;
}

interface Message {
    text: string;
}

export default function ChatGroup({ searchQuery }: ChatGroupProps) {
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null); // Auto-scroll reference

    useEffect(() => {
        setMessages([]); // Clear messages when searchQuery changes

        const handleMessage = (msg: Message) => {
            setMessages((prev) => [...prev, msg]);
        };

        socket.on("message", handleMessage);

        return () => {
            socket.off("message", handleMessage);
        };
    }, [searchQuery]);

    useEffect(() => {
        // Scroll to the bottom when messages update
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (!message.trim()) return;
        socket.emit("message", { searchQuery, text: message });
        setMessage("");
    };

    return (
        <div className="flex flex-col h-96 w-full max-w-lg mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
            {/* Header */}
            <div className="bg-blue-500 text-white p-4 text-center font-semibold">
                Group Chat: <span className="font-bold">"{searchQuery}"</span>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div key={index} className="bg-white p-2 rounded-lg shadow text-gray-800">
                            {msg.text}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm italic text-center">No messages yet... Start the conversation!</p>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Message input */}
            <div className="flex items-center p-3 bg-white">
                <input 
                    type="text" 
                    value={message} 
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault(); // Prevents any unintended form submission
                            sendMessage();
                        }
                    }}
                    placeholder="Type a message..." 
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-full  focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                />
                <button 
                    onClick={sendMessage}
                    className="ml-2 px-5 py-2 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white rounded-full focus:outline-none  font-semibold transition-colors"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
