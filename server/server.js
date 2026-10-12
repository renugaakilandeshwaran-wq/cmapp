
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-room", (roomId) => {
        socket.join(roomId);
        console.log(`${socket.id} joined room ${roomId}`);
    });

    socket.on("call-user", ({ roomId, offer, callType }) => {
        socket.to(roomId).emit("incoming-call", {
            from: socket.id,
            offer,
            callType,
        });
    });

    socket.on("answer-call", ({ to, answer }) => {
        io.to(to).emit("call-answered", {
            from: socket.id,
            answer,
        });
    });
    socket.on("ice-candidate", ({ roomId, candidate }) => {
        socket.to(roomId).emit("ice-candidate", {
            from: socket.id,
            candidate,
        });
    });

    socket.on("end-call", ({ roomId }) => {
        socket.to(roomId).emit("call-ended");
    });

    socket.on("reject-call", ({ to }) => {
        io.to(to).emit("call-rejected");
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

app.get("/", (_req, res) => {
    res.send("CM Chat signaling server is running!");
});

server.listen(3001, () => {
    console.log("CM Chat server running on http://localhost:3001");
});
