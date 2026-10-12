import { useState } from "react";
import {
    FiArrowLeft,
    FiChevronRight,
    FiPlus,
} from "react-icons/fi";

type PrivacyProps = {
    onClose: () => void;
};

type PrivacyOption = "Everyone" | "My contacts" | "Nobody";

type PrivacyPage =
    | "main"
    | "lastSeen"
    | "profilePhoto"
    | "about"
    | "groups"
    | "blocked"
    | "contacts";

const contacts = [
    { id: 1, name: "Arun", image: "https://i.pravatar.cc/100?img=12" },
    { id: 2, name: "Priya", image: "https://i.pravatar.cc/100?img=47" },
    { id: 3, name: "Karthik", image: "https://i.pravatar.cc/100?img=13" },
    { id: 4, name: "Divya", image: "https://i.pravatar.cc/100?img=44" },
];

function Privacy({ onClose }: PrivacyProps) {
    const [page, setPage] = useState<PrivacyPage>("main");

    const [lastSeen, setLastSeen] = useState<PrivacyOption>(
        () => (localStorage.getItem("privacy-lastSeen") as PrivacyOption) || "Everyone"
    );

    const [profilePhoto, setProfilePhoto] = useState<PrivacyOption>(
        () => (localStorage.getItem("privacy-profilePhoto") as PrivacyOption) || "Everyone"
    );

    const [about, setAbout] = useState<"Everyone" | "Nobody">(
        () => (localStorage.getItem("privacy-about") as "Everyone" | "Nobody") || "Everyone"
    );
    const [groups, setGroups] = useState<PrivacyOption>(
        () => (localStorage.getItem("privacy-groups") as PrivacyOption) || "Everyone"
    );

    const [readReceipts, setReadReceipts] = useState(
        () => localStorage.getItem("privacy-readReceipts") !== "false"
    );

    const [blockedContacts, setBlockedContacts] = useState<number[]>(
        () => JSON.parse(localStorage.getItem("blockedContacts") || "[]")
    );

    const saveOption = (
        key: string,
        value: PrivacyOption,
        setter: (value: PrivacyOption) => void
    ) => {
        setter(value);
        localStorage.setItem(`privacy-${key}`, value);
    };

    const handleBlock = (id: number) => {
        const updated = [...blockedContacts, id];
        setBlockedContacts(updated);
        localStorage.setItem("blockedContacts", JSON.stringify(updated));
    };

    const handleUnblock = (id: number) => {
        const updated = blockedContacts.filter((contactId) => contactId !== id);
        setBlockedContacts(updated);
        localStorage.setItem("blockedContacts", JSON.stringify(updated));
    };

    const goBack = () => {
        if (page === "main") {
            onClose();
        } else if (page === "contacts") {
            setPage("blocked");
        } else {
            setPage("main");
        }
    };

    const heading: Record<PrivacyPage, string> = {
        main: "Privacy",
        lastSeen: "Last seen",
        profilePhoto: "Profile photo",
        about: "About",
        groups: "Groups",
        blocked: "Blocked contacts",
        contacts: "Select contact",
    };

    const renderPrivacyOptions = (
        title: string,
        value: PrivacyOption,
        setter: (value: PrivacyOption) => void,
        storageKey: string
    ) => (
        <div className="px-5 py-5">
            <p className="mb-2 font-medium text-gray-800 dark:text-white">
                {title}
            </p>

            <p className="mb-5 text-sm text-blue-500 dark:text-gray-400">
                If you don’t share your Last Seen, you won’t be
                able to see other people’s  {title.toLowerCase()}?
            </p>

            {(["Everyone", "My contacts", "Nobody"] as PrivacyOption[]).map(
                (option) => (
                    <label
                        key={option}
                        className="flex cursor-pointer items-center gap-3 border-b border-gray-200 py-4 last:border-b-0 dark:border-gray-700"
                    >
                        <input
                            type="radio"
                            name={storageKey}
                            value={option}
                            checked={value === option}
                            onChange={() =>
                                saveOption(storageKey, option, setter)
                            }
                            className="h-4 w-4 accent-blue-600"
                        />

                        <span className="text-sm text-gray-700 dark:text-gray-200">
                            {option}
                        </span>
                    </label>
                )
            )}
        </div>
    );

    return (
        <div className="min-h-screen w-full bg-white dark:bg-gray-900">

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-5 dark:border-gray-700">
                <button
                    type="button"
                    onClick={goBack}
                    aria-label="Go back"
                    className="text-gray-600 hover:text-green-600 dark:text-gray-300"
                >
                    <FiArrowLeft size={22} />
                </button>

                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    {heading[page]}
                </h1>
            </div>

            {/* Privacy Main Page */}
            {page === "main" && (
                <div className="px-5">

                    <button
                        type="button"
                        onClick={() => setPage("lastSeen")}
                        className="flex w-full items-center justify-between border-b border-gray-200 py-5 text-left dark:border-gray-700"
                    >
                        <div>
                            <p className="text-sm text-gray-800 dark:text-white">
                                Last seen
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                {lastSeen}
                            </p>
                        </div>
                        <FiChevronRight className="text-gray-400" size={20} />
                    </button>

                    <button
                        type="button"
                        onClick={() => setPage("profilePhoto")}
                        className="flex w-full items-center justify-between border-b border-gray-200 py-5 text-left dark:border-gray-700"
                    >
                        <div>
                            <p className="text-sm text-gray-800 dark:text-white">
                                Profile photo
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                {profilePhoto}
                            </p>
                        </div>
                        <FiChevronRight className="text-gray-400" size={20} />
                    </button>

                    <div className="flex items-center justify-between border-b border-gray-200 py-5 dark:border-gray-700">
                        <div>
                            <p className="text-sm text-gray-800 dark:text-white">
                                Read receipts
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                Show read receipts for messages
                            </p>
                        </div>

                        <input
                            type="checkbox"
                            checked={readReceipts}
                            onChange={(e) => {
                                setReadReceipts(e.target.checked);
                                localStorage.setItem(
                                    "privacy-readReceipts",
                                    String(e.target.checked)
                                );
                            }}
                            className="h-4 w-4 accent-green-600"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => setPage("groups")}
                        className="flex w-full items-center justify-between border-b border-gray-200 py-5 text-left dark:border-gray-700"
                    >
                        <div>
                            <p className="text-sm text-gray-800 dark:text-white">
                                Groups
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                {groups}
                            </p>
                        </div>
                        <FiChevronRight className="text-gray-400" size={20} />
                    </button>
                    <button
                        type="button"
                        onClick={() => setPage("about")}
                        className="flex w-full items-center justify-between border-b border-gray-200 py-5 text-left dark:border-gray-700"
                    >
                        <div>
                            <p className="text-sm text-gray-800 dark:text-white">
                                About
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                {about}
                            </p>
                        </div>

                        <FiChevronRight className="text-gray-400" size={20} />
                    </button>
                    <button
                        type="button"
                        onClick={() => setPage("blocked")}
                        className="flex w-full items-center justify-between border-b border-gray-200 py-5 text-left dark:border-gray-700"
                    >
                        <div>
                            <p className="text-sm text-gray-800 dark:text-white">
                                Blocked contacts
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                {blockedContacts.length} contacts
                            </p>
                        </div>
                        <FiChevronRight className="text-gray-400" size={20} />
                    </button>
                </div>
            )}

            {/* Last Seen */}
            {page === "lastSeen" &&
                renderPrivacyOptions(
                    "Last seen",
                    lastSeen,
                    setLastSeen,
                    "lastSeen"
                )}

            {/* Profile Photo */}
            {page === "profilePhoto" &&
                renderPrivacyOptions(
                    "Profile photo",
                    profilePhoto,
                    setProfilePhoto,
                    "profilePhoto"
                )}

            {/* Groups */}
            {page === "groups" &&
                renderPrivacyOptions(
                    "Groups",
                    groups,
                    setGroups,
                    "groups"
                )}

            {page === "about" && (
                <div className="px-5 py-5">


                    <p className="mb-5 text-sm text-blue-500 dark:text-gray-400">
                        Who can see my About?
                    </p>

                    {(["Everyone", "Nobody",] as const).map((option) => (
                        <label
                            key={option}
                            className="flex cursor-pointer items-center gap-3 border-b border-gray-200 py-4 dark:border-gray-700"
                        >
                            <input
                                type="radio"
                                name="about"
                                checked={about === option}
                                onChange={() => {
                                    setAbout(option);
                                    localStorage.setItem("privacy-about", option);
                                }}
                                className="h-4 w-4 accent-green-600"
                            />

                            <span className="text-sm text-gray-700 dark:text-gray-200">
                                {option}
                            </span>
                        </label>
                    ))}
                </div>
            )}

            {/* Blocked Contacts */}
            {page === "blocked" && (
                <div className="px-5">

                    <button
                        type="button"
                        onClick={() => setPage("contacts")}
                        className="flex w-full items-center justify-between border-b border-gray-200 py-5 dark:border-gray-700"
                    >
                        <span className="text-sm font-medium text-green-600">
                            Block new contact
                        </span>
                        <FiPlus size={22} className="text-green-600" />
                    </button>

                    {blockedContacts.length === 0 ? (
                        <p className="py-8 text-center text-sm text-gray-500">
                            No blocked contacts
                        </p>
                    ) : (
                        contacts
                            .filter((contact) =>
                                blockedContacts.includes(contact.id)
                            )
                            .map((contact) => (
                                <div
                                    key={contact.id}
                                    className="flex items-center gap-3 border-b border-gray-200 py-4 dark:border-gray-700"
                                >
                                    <img
                                        src={contact.image}
                                        alt={contact.name}
                                        className="h-11 w-11 rounded-full object-cover"
                                    />

                                    <span className="flex-1 text-sm text-gray-800 dark:text-white">
                                        {contact.name}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => handleUnblock(contact.id)}
                                        className="text-sm text-green-600"
                                    >
                                        Unblock
                                    </button>
                                </div>
                            ))
                    )}
                </div>
            )}

            {/* Select Contact to Block */}
            {page === "contacts" && (
                <div className="px-5">
                    {contacts
                        .filter(
                            (contact) =>
                                !blockedContacts.includes(contact.id)
                        )
                        .map((contact) => (
                            <div
                                key={contact.id}
                                className="flex items-center gap-3 border-b border-gray-200 py-4 dark:border-gray-700"
                            >
                                <img
                                    src={contact.image}
                                    alt={contact.name}
                                    className="h-11 w-11 rounded-full object-cover"
                                />

                                <span className="flex-1 text-sm text-gray-800 dark:text-white">
                                    {contact.name}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => handleBlock(contact.id)}
                                    className="rounded-lg bg-green-600 px-3 py-2 text-xs text-white hover:bg-green-700"
                                >
                                    Block
                                </button>
                            </div>
                        ))}

                    {contacts.every((contact) =>
                        blockedContacts.includes(contact.id)
                    ) && (
                            <p className="py-8 text-center text-sm text-gray-500">
                                No more contacts available
                            </p>
                        )}
                </div>
            )}
        </div>
    );
}

export default Privacy;