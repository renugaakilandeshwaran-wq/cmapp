import { useState } from "react";
import {
    FiSearch,
    FiPlus,
    FiX,
} from "react-icons/fi";
import type { Chat } from "../types/chat";
import ChatItem from "./ChatItem";

type Props = {
    chats: Chat[];
    onSelectChat: (chat: Chat) => void;
};

function ChatList({ chats, onSelectChat }: Props) {
    const [search, setSearch] = useState("");
    const [showNewChat, setShowNewChat] = useState(false);
    const [contactSearch, setContactSearch] = useState("");

    const filteredChats = chats.filter((chat) =>
        chat.name.toLowerCase().includes(search.toLowerCase())
    );

    const pinnedChats = filteredChats.filter(
        (chat) => chat.isPinned
    );

    const normalChats = filteredChats.filter(
        (chat) => !chat.isPinned
    );

    const filteredContacts = chats.filter((chat) =>
        chat.name.toLowerCase().includes(contactSearch.toLowerCase())
    );

    const handleSelectContact = (chat: Chat) => {
        onSelectChat(chat);
        setShowNewChat(false);
        setContactSearch("");
    };

    return (
        <div className="flex h-full min-h-0 w-full flex-col border-r border-gray-200 bg-white md:w-[380px]">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-5">
                <h1 className="text-2xl font-bold text-gray-800">
                    Chats
                </h1>

                <button
                    onClick={() => setShowNewChat(true)}
                    className="rounded-full p-2 hover:bg-gray-100"
                    title="New chat"
                    aria-label="New chat"
                >
                    <FiPlus size={22} />
                </button>
            </div>

            {/* Search chats */}
            <div className="px-4 pb-4">
                <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2">
                    <FiSearch className="text-gray-500" />

                    <input
                        type="text"
                        placeholder="Search chats"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-transparent text-sm outline-none"
                    />
                </div>
            </div>

            {/* Chat list */}
            <div className="min-h-0 flex-1 overflow-y-auto">
                {pinnedChats.length > 0 && (
                    <div>
                        <p className="px-4 py-2 text-xs font-semibold uppercase text-gray-400">
                            Pinned
                        </p>

                        {pinnedChats.map((chat) => (
                            <ChatItem
                                key={chat.id}
                                chat={chat}
                                onClick={() => onSelectChat(chat)}
                            />
                        ))}
                    </div>
                )}

                <div>
                    <p className="px-4 py-2 text-xs font-semibold uppercase text-gray-400">
                        All Chats
                    </p>

                    {normalChats.map((chat) => (
                        <ChatItem
                            key={chat.id}
                            chat={chat}
                            onClick={() => onSelectChat(chat)}
                        />
                    ))}

                    {filteredChats.length === 0 && (
                        <p className="px-4 py-6 text-center text-sm text-gray-400">
                            No chats found
                        </p>
                    )}
                </div>
            </div>

            {/* New Chat Popup */}
            {showNewChat && (
                <div
                    className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4"
                    onClick={() => setShowNewChat(false)}
                >
                    <div
                        className="flex max-h-[80vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Popup Header */}
                        <div className="flex items-center justify-between px-5 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                New Chat
                            </h2>

                            <button
                                onClick={() => {
                                    setShowNewChat(false);
                                    setContactSearch("");
                                }}
                                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                                aria-label="Close new chat"
                            >
                                <FiX size={22} />
                            </button>
                        </div>

                        <hr className="border-gray-200" />

                        {/* Contact Search */}
                        <div className="p-4">
                            <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-3">
                                <FiSearch className="shrink-0 text-gray-500" />

                                <input
                                    type="text"
                                    placeholder="Search contacts"
                                    value={contactSearch}
                                    onChange={(e) =>
                                        setContactSearch(e.target.value)
                                    }
                                    autoFocus
                                    className="w-full bg-transparent text-sm outline-none"
                                />
                            </div>
                        </div>

                        {/* Contact List Heading */}
                        <p className="px-5 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                            All Contacts
                        </p>

                        {/* Contact List */}
                        <div className="min-h-0 flex-1 overflow-y-auto pb-3">
                            {filteredContacts.length > 0 ? (
                                filteredContacts.map((chat) => (
                                    <button
                                        key={chat.id}
                                        onClick={() =>
                                            handleSelectContact(chat)
                                        }
                                        className="flex w-full items-center gap-3 px-5 py-3 text-left transition hover:bg-gray-50"
                                    >
                                        <img
                                            src={chat.avatar}
                                            alt={chat.name}
                                            className="h-11 w-11 shrink-0 rounded-full object-cover"
                                        />

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate font-medium text-gray-800">
                                                {chat.name}
                                            </p>

                                            <p className="truncate text-sm text-gray-500">
                                                {chat.about || (chat.isOnline ? "Online" : "Offline")}
                                            </p>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <p className="px-5 py-8 text-center text-sm text-gray-400">
                                    No contacts found
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatList;
