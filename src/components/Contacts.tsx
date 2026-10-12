import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import type { Chat } from "../types/chat";

type Props = {
    contacts: Chat[];
    onSelectContact: (contact: Chat) => void;
};

function Contacts({ contacts, onSelectContact }: Props) {
    const [search, setSearch] = useState("");

    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="h-screen w-full shrink-0 border-r border-gray-200 bg-white md:w-[380px]">

            {/* Header */}
            <div className="px-5 py-5">
                <h1 className="text-2xl font-bold text-gray-800">
                    Contacts
                </h1>
            </div>

            {/* Search */}
            <div className="px-4 pb-4">
                <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2.5">
                    <FiSearch className="text-gray-500" />

                    <input
                        type="text"
                        placeholder="Search contacts"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-transparent text-sm outline-none"
                    />
                </div>
            </div>

            {/* Contact count */}
            <p className="px-4 py-2 text-xs font-semibold uppercase text-gray-400">
                {filteredContacts.length} Contacts
            </p>

            {/* Contact List */}
            <div className="overflow-y-auto">

                {filteredContacts.length > 0 ? (
                    filteredContacts.map((contact) => (
                        <div
                            key={contact.id}
                            onClick={() => onSelectContact(contact)}
                            className="flex cursor-pointer items-center gap-3 border-b border-gray-100 px-4 py-3 transition hover:bg-gray-50"
                        >

                            {/* Profile image */}
                            <div className="relative">
                                <img
                                    src={contact.avatar}
                                    alt={contact.name}
                                    className="h-12 w-12 rounded-full object-cover"
                                />

                                {contact.isOnline && (
                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
                                )}
                            </div>

                            {/* Contact details */}
                            <div className="min-w-0 flex-1">

                                <h3 className="font-semibold text-gray-800">
                                    {contact.name}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    {contact.isOnline
                                        ? "Online"
                                        : `Last seen ${contact.lastSeen}`}
                                </p>

                            </div>

                        </div>
                    ))
                ) : (
                    <div className="px-5 py-10 text-center">
                        <p className="text-gray-400">
                            No contacts found
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Contacts;