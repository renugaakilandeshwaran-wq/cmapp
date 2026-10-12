
import { useMemo, useState } from "react";
import {
    FiSearch,
    FiPlus,
    FiX,
    FiUsers,
    FiCheck,
} from "react-icons/fi";
import type { Chat } from "../types/chat";

type Props = {
    contacts: Chat[];
    onSelectGroup: (group: Chat) => void;
};

type GroupItem = {
    chat: Chat;
    memberIds: string[];
    isArchived: boolean;
};

function Groups({ contacts, onSelectGroup }: Props) {
    const [groups, setGroups] = useState<GroupItem[]>([]);
    const [search, setSearch] = useState("");
    const [showCreate, setShowCreate] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const [contactSearch, setContactSearch] = useState("");

    const filteredGroups = useMemo(
        () =>
            groups.filter((group) =>
                group.chat.name.toLowerCase().includes(search.toLowerCase())
            ),
        [groups, search]
    );

    const pinnedGroups = filteredGroups.filter(
        (group) => group.chat.isPinned && !group.isArchived
    );

    const archivedGroups = filteredGroups.filter(
        (group) => group.isArchived
    );

    const allGroups = filteredGroups.filter(
        (group) => !group.chat.isPinned && !group.isArchived
    );

    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(contactSearch.toLowerCase())
    );

    const toggleMember = (id: string) => {
        setSelectedMembers((previous) =>
            previous.includes(id)
                ? previous.filter((memberId) => memberId !== id)
                : [...previous, id]
        );
    };

    const resetPopup = () => {
        setShowCreate(false);
        setGroupName("");
        setSelectedMembers([]);
        setContactSearch("");
    };

    const createGroup = () => {
        if (!groupName.trim()) {
            alert("Please enter a group name");
            return;
        }

        if (selectedMembers.length === 0) {
            alert("Please select at least one contact");
            return;
        }

        const members = contacts.filter((contact) =>
            selectedMembers.includes(contact.id)
        );

        const newGroup: Chat = {
            id: `group-${Date.now()}`,
            name: groupName.trim(),
            avatar: "https://i.pravatar.cc/150?img=60",
            lastMessage: `${members.length} members`,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            unreadCount: 0,
            isOnline: false,
            isPinned: false,
            about: `${members.length} members`,
            messages: [],
        };

        setGroups((previous) => [
            ...previous,
            {
                chat: newGroup,
                memberIds: selectedMembers,
                isArchived: false,
            },
        ]);

        resetPopup();
    };

    const openGroup = (group: GroupItem) => {
        onSelectGroup(group.chat);
    };

    const renderGroup = (group: GroupItem) => (
        <button
            key={group.chat.id}
            onClick={() => openGroup(group)}
            className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-gray-50"
        >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <FiUsers size={22} />
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-gray-800">
                    {group.chat.name}
                </p>
                <p className="truncate text-sm text-gray-500">
                    {group.memberIds.length} members
                </p>
            </div>
        </button>
    );

    return (
        <div className="flex h-full min-h-0 w-full flex-col border-r border-gray-200 bg-white md:w-[380px]">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-5">
                <h1 className="text-2xl font-bold text-gray-800">
                    Groups
                </h1>

                <button
                    onClick={() => setShowCreate(true)}
                    className="rounded-full p-2 hover:bg-gray-100"
                    title="Create new group"
                    aria-label="Create new group"
                >
                    <FiPlus size={22} />
                </button>
            </div>

            {/* Search */}
            <div className="px-4 pb-4">
                <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2">
                    <FiSearch className="text-gray-500" />
                    <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search groups"
                        className="w-full bg-transparent text-sm outline-none"
                    />
                </div>
            </div>

            {/* Create Group Button */}
            <button
                onClick={() => setShowCreate(true)}
                className="mx-4 mb-4 flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
            >
                <FiPlus size={19} />
                Create New Group
            </button>

            {/* Group Lists */}
            <div className="min-h-0 flex-1 overflow-y-auto pb-4">
                <p className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Pinned Groups
                </p>

                {pinnedGroups.length > 0 ? (
                    pinnedGroups.map(renderGroup)
                ) : (
                    <p className="px-4 pb-3 text-sm text-gray-400">
                        No pinned groups
                    </p>
                )}

                <p className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Archived Groups
                </p>

                {archivedGroups.length > 0 ? (
                    archivedGroups.map(renderGroup)
                ) : (
                    <p className="px-4 pb-3 text-sm text-gray-400">
                        No archived groups
                    </p>
                )}

                <p className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    All Groups
                </p>

                {allGroups.length > 0 ? (
                    allGroups.map(renderGroup)
                ) : (
                    <div className="px-4 py-6 text-center">
                        <FiUsers
                            size={30}
                            className="mx-auto text-gray-300"
                        />
                        <p className="mt-2 text-sm text-gray-500">
                            No groups yet
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                            Create a group to get started
                        </p>
                    </div>
                )}
            </div>

            {/* Create Group Popup */}
            {showCreate && (
                <div
                    className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 p-4"
                    onClick={resetPopup}
                >
                    <div
                        className="flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {/* Popup Header */}
                        <div className="flex items-center justify-between px-5 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Create New Group
                            </h2>
                            <button
                                onClick={resetPopup}
                                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                                aria-label="Close"
                            >
                                <FiX size={22} />
                            </button>
                        </div>

                        <hr className="border-gray-200" />

                        {/* Group Name */}
                        <div className="p-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Group Name
                            </label>
                            <input
                                value={groupName}
                                onChange={(event) =>
                                    setGroupName(event.target.value)
                                }
                                placeholder="Enter group name"
                                className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Contact Search */}
                        <div className="px-4 pb-3">
                            <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-3">
                                <FiSearch className="text-gray-500" />
                                <input
                                    value={contactSearch}
                                    onChange={(event) =>
                                        setContactSearch(event.target.value)
                                    }
                                    placeholder="Search contacts"
                                    className="w-full bg-transparent text-sm outline-none"
                                />
                            </div>
                        </div>

                        <p className="px-5 pb-2 text-xs font-semibold uppercase text-gray-400">
                            Select Participants ({selectedMembers.length})
                        </p>

                        {/* Contacts */}
                        <div className="min-h-0 flex-1 overflow-y-auto">
                            {filteredContacts.map((contact) => {
                                const selected = selectedMembers.includes(
                                    contact.id
                                );

                                return (
                                    <button
                                        key={contact.id}
                                        onClick={() =>
                                            toggleMember(contact.id)
                                        }
                                        className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-gray-50"
                                    >
                                        <img
                                            src={contact.avatar}
                                            alt={contact.name}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />

                                        <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-800">
                                            {contact.name}
                                        </span>

                                        <span
                                            className={`flex h-5 w-5 items-center justify-center rounded border ${selected
                                                ? "border-blue-500 bg-blue-500 text-white"
                                                : "border-gray-300"
                                                }`}
                                        >
                                            {selected && <FiCheck size={14} />}
                                        </span>
                                    </button>
                                );
                            })}

                            {filteredContacts.length === 0 && (
                                <p className="px-5 py-8 text-center text-sm text-gray-400">
                                    No contacts found
                                </p>
                            )}
                        </div>

                        {/* Create Button */}
                        <div className="border-t border-gray-200 p-4">
                            <button
                                onClick={createGroup}
                                className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                            >
                                Create Group
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Groups;
