
import { useEffect, useRef, useState } from "react";
import {
    FiArrowLeft,
    FiPhone,
    FiVideo,
    FiMoreVertical,
    FiFileText,
    FiPhoneOff,
    FiX,
    FiCheck,
} from "react-icons/fi";

import type { Chat, Message } from "../types/chat";
import { useWebRTCCall } from "../hooks/useWebRTCCall";
import MessageInput from "./MessageInput";
import Profile from "./Profile";

type CallHistoryItem = {
    id: string;
    type: "audio" | "video";
    direction: "incoming" | "outgoing";
    status: "Calling" | "Connected" | "Rejected" | "Missed call" | "Ended";
    dateTime: string;
    duration?: string;
};

type Props = {
    chat: Chat;
    onBack: () => void;
};


function ChatScreen({ chat, onBack }: Props) {
    const [messages, setMessages] = useState<Message[]>(
        chat.messages
    );

    const [showProfile, setShowProfile] = useState(false);

    // WebRTC call hook
    const {
        startCall,
        acceptCall,
        rejectCall,
        endCall,
        incomingCall,
        callType,
        inCall,
        localStream,
        remoteStream,
        error,
    } = useWebRTCCall(chat.id);

    // Video references
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    // Connect camera streams to video elements
    useEffect(() => {
        if (localVideoRef.current) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    useEffect(() => {
        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    const handleSend = (
        text: string,
        type: "text" | "image" | "file" = "text",
        fileUrl?: string,
        fileName?: string
    ) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            text,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            sender: "me",
            type,
            fileUrl,
            fileName,
        };

        setMessages((prev) => [...prev, newMessage]);
    };

    const handleStartCall = async (type: "audio" | "video") => {
        await startCall(type);
    };

    const handleEndCall = () => {
        endCall();
    };

    return (
        <div className="relative flex h-screen min-w-0 flex-1 bg-gray-100">

            {/* CHAT AREA */}

            <div className="flex min-w-0 flex-1 flex-col">

                {/* CHAT HEADER */}

                <div className="flex items-center justify-between border-b bg-white px-4 py-3">

                    <div className="flex min-w-0 items-center gap-3">

                        <button
                            onClick={onBack}
                            className="rounded-full p-2 hover:bg-gray-100 md:hidden"
                            aria-label="Back to chats"
                        >
                            <FiArrowLeft size={22} />
                        </button>

                        {/* Profile image */}

                        <button
                            onClick={() => setShowProfile(true)}
                            className="relative shrink-0"
                        >
                            <img
                                src={chat.avatar}
                                alt={chat.name}
                                className="h-10 w-10 rounded-full object-cover"
                            />

                            {chat.isOnline && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                            )}
                        </button>

                        {/* Name and status */}

                        <button
                            onClick={() => setShowProfile(true)}
                            className="min-w-0 text-left"
                        >
                            <h2 className="truncate font-semibold text-gray-800">
                                {chat.name}
                            </h2>

                            <p className="text-xs text-gray-500">
                                {chat.isOnline
                                    ? "Online"
                                    : `Last seen ${chat.lastSeen ?? "recently"} `}
                            </p>
                        </button>

                    </div>

                    {/* CALL BUTTONS */}

                    <div className="flex shrink-0 items-center gap-1">

                        <button
                            onClick={() => void handleStartCall("audio")}
                            disabled={Boolean(callType) || Boolean(incomingCall)}
                            className="rounded-full p-2 text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                            title="Voice call"
                            aria-label="Start voice call"
                        >
                            <FiPhone size={20} />
                        </button>

                        <button
                            onClick={() => void handleStartCall("video")}
                            disabled={Boolean(callType) || Boolean(incomingCall)}
                            className="rounded-full p-2 text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                            title="Video call"
                            aria-label="Start video call"
                        >
                            <FiVideo size={20} />
                        </button>

                        <button
                            onClick={() => setShowProfile(true)}
                            className="rounded-full p-2 hover:bg-gray-100"
                            title="Contact details"
                            aria-label="Contact details"
                        >
                            <FiMoreVertical size={20} />
                        </button>

                    </div>
                </div>

                {/* ERROR MESSAGE */}

                {error && (
                    <div className="flex items-center justify-between gap-3 bg-red-50 px-4 py-3 text-sm text-red-700">
                        <p>{error}</p>

                        <button
                            onClick={() => {
                                endCall();
                            }}
                            className="shrink-0 rounded p-1 hover:bg-red-100"
                            aria-label="Close error"
                        >
                            <FiX size={18} />
                        </button>
                    </div>
                )}

                {/* MESSAGES */}

                <div className="flex-1 space-y-3 overflow-y-auto p-4">

                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === "me"
                                ? "justify-end"
                                : "justify-start"
                                } `}
                        >
                            <div
                                className={`max-w-[75%] rounded-2xl px-4 py-2 ${message.sender === "me"
                                    ? "rounded-br-none bg-green-500 text-white"
                                    : "rounded-bl-none bg-white text-gray-800"
                                    }`}
                            >
                                {message.type === "image" &&
                                    message.fileUrl ? (
                                    <img
                                        src={message.fileUrl}
                                        alt={message.fileName || "Sent image"}
                                        className="max-h-72 max-w-full rounded-lg object-cover"
                                    />
                                ) : message.type === "file" ? (
                                    <a
                                        href={message.fileUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-3 rounded-lg bg-gray-50 p-3"
                                    >
                                        <FiFileText
                                            size={24}
                                            className="shrink-0 text-blue-500"
                                        />

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-gray-700">
                                                {message.fileName}
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                Document
                                            </p>
                                        </div>
                                    </a>
                                ) : (
                                    <p className="whitespace-pre-wrap break-words">
                                        {message.text}
                                    </p>
                                )}

                                <p
                                    className={`mt-1 text-right text-[10px] ${message.sender === "me"
                                        ? "text-green-100"
                                        : "text-gray-400"
                                        } `}
                                >
                                    {message.time}

                                    {message.sender === "me" && (
                                        <span className="ml-1">✓✓</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}

                </div>

                {/* MESSAGE INPUT */}

                <MessageInput onSend={handleSend} />

            </div>

            {/* RIGHT PROFILE */}

            {showProfile && (
                <Profile
                    chat={chat}
                    onClose={() => setShowProfile(false)}
                />
            )}

            {/* INCOMING CALL POPUP */}

            {incomingCall && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">

                        <img
                            src={chat.avatar}
                            alt={chat.name}
                            className="mx-auto mb-4 h-20 w-20 rounded-full object-cover"
                        />

                        <h2 className="text-xl font-semibold text-gray-800">
                            {chat.name}
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Incoming {incomingCall.callType === "video"
                                ? "video"
                                : "voice"} call...
                        </p>

                        <div className="mt-6 flex justify-center gap-8">

                            <button
                                onClick={rejectCall}
                                className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                                aria-label="Reject call"
                                title="Reject call"
                            >
                                <FiPhoneOff size={24} />
                            </button>

                            <button
                                onClick={() => void acceptCall()}
                                className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600"
                                aria-label="Accept call"
                                title="Accept call"
                            >
                                <FiCheck size={26} />
                            </button>

                        </div>
                    </div>
                </div>
            )}

            {/* ACTIVE CALL WINDOW */}

            {/* CALLING / ACTIVE CALL POPUP */}

            {callType && inCall && (
                <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl">

                        <p className="text-sm font-medium text-green-600">
                            {remoteStream ? "Connected" : "Calling..."}
                        </p>

                        <h2 className="mt-2 text-xl font-semibold text-gray-800">
                            {chat.name}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {callType === "video" ? "Video call" : "Voice call"}
                        </p>

                        {/* TWO ROUND PROFILES */}
                        <div className="mt-7 flex items-center justify-center gap-8">
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 ring-4 ring-blue-50">
                                    <span className="text-xl font-semibold text-blue-700">
                                        You
                                    </span>
                                </div>
                                <span className="text-sm text-gray-600">You</span>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <img
                                    src={chat.avatar}
                                    alt={chat.name}
                                    className="h-24 w-24 rounded-full object-cover ring-4 ring-green-100"
                                />
                                <span className="max-w-28 truncate text-sm text-gray-600">
                                    {chat.name}
                                </span>
                            </div>
                        </div>

                        {/* VIDEO PREVIEW */}
                        {callType === "video" && (
                            <div className="relative mt-5 overflow-hidden rounded-xl bg-gray-900">
                                {remoteStream && (
                                    <video
                                        ref={remoteVideoRef}
                                        autoPlay
                                        playsInline
                                        className="h-44 w-full object-cover"
                                    />
                                )}

                                {localStream && (
                                    <video
                                        ref={localVideoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        className="absolute bottom-2 right-2 h-20 w-28 rounded-lg border-2 border-white object-cover"
                                    />
                                )}

                                {!remoteStream && (
                                    <p className="p-4 text-sm text-white">
                                        Waiting for {chat.name}...
                                    </p>
                                )}
                            </div>
                        )}

                        <p className="mt-5 text-sm text-gray-500">
                            {remoteStream
                                ? "Call connected"
                                : "Waiting for the other person to answer"}
                        </p>

                        <button
                            onClick={handleEndCall}
                            className="mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                            title="End call"
                            aria-label="End call"
                        >
                            <FiPhoneOff size={24} />
                        </button>

                        <p className="mt-2 text-xs text-gray-400">End call</p>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ChatScreen;
