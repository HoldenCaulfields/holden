require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: "https://holden-jet.vercel.app",
    credentials: true
}));

const io = new Server(server, {
    cors: {
        origin: "https://holden-jet.vercel.app/", // Corrected origin
        methods: ["GET", "POST"]
    }
});

// Use Map & Set to store search groups efficiently
const searchGroups = new Map(); // "search-term" -> Set(socketIDs)

io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("search", (query) => {
        console.log("User searched:", query);

        // Ensure the group exists
        if (!searchGroups.has(query)) {
            searchGroups.set(query, new Set());
        }

        // Add user to group
        searchGroups.get(query).add(socket.id);
        socket.join(query);

        // Emit updated count
        io.to(query).emit("updateResults", {
            searchTerm: query,
            count: searchGroups.get(query).size
        });
    });

    socket.on("message", ({ searchQuery, text }) => {
        console.log(`Message received in room ${searchQuery}:`, text);

        // ✅ Emit message only to users in the same room
        io.to(searchQuery).emit("message", { text });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);

        // Remove user from all groups
        for (const [query, users] of searchGroups.entries()) {
            if (users.has(socket.id)) {
                users.delete(socket.id);

                // Emit updated count
                io.to(query).emit("updateResults", {
                    searchTerm: query,
                    count: users.size
                });

                // Remove empty search group
                if (users.size === 0) {
                    searchGroups.delete(query);
                }
            }
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
