
import { useState } from "react";
import {
    FiArrowLeft,
    FiPhone,
    FiVideo,
    FiPhoneIncoming,
    FiPhoneOutgoing,
    FiPhoneMissed,
    FiTrash2,
} from "react-icons/fi";

type CallStatus = "Connected" | "Rejected" | "Missed call";

type CallItem = {
    id: string;
    name: string;
    avatar: string;
    type: "audio" | "video";
    direction: "incoming" | "outgoing";
    status: CallStatus;
    dateTime: string;
};

type Props = {
    onBack: () => void;
};

const initialCalls: CallItem[] = [
    {
        id: "1",
        name: "Arun",
        avatar: "https://i.pravatar.cc/150?img=12",
        type: "audio",
        direction: "incoming",
        status: "Connected",
        dateTime: "12 Oct 2026, 10:30 AM",
    },
    {
        id: "2",
        name: "Priya",
        avatar: "https://i.pravatar.cc/150?img=47",
        type: "video",
        direction: "outgoing",
        status: "Missed call",
        dateTime: "11 Oct 2026, 06:15 PM",
    },
    {
        id: "3",
        name: "Kumar",
        avatar: "https://i.pravatar.cc/150?img=33",
        type: "audio",
        direction: "outgoing",
        status: "Rejected",
        dateTime: "10 Oct 2026, 02:45 PM",
    },
];

function CallHistory({ onBack }: Props) {
    const [calls, setCalls] = useState<CallItem[]>(() => {
        try {
            const saved = localStorage.getItem("cm-call-history");
            return saved ? JSON.parse(saved) as CallItem[] : initialCalls;
        } catch {
            return initialCalls;
        }
    });

    const [filter, setFilter] = useState<"All" | "Missed">("All");

    const saveCalls = (updatedCalls: CallItem[]) => {
        setCalls(updatedCalls);
        localStorage.setItem("cm-call-history", JSON.stringify(updatedCalls));
    };

    const filteredCalls = calls.filter((call) =>
        filter === "All" ? true : call.status === "Missed call"
    );

    const clearHistory = () => {
        if (window.confirm("Clear all call history?")) {
            saveCalls([]);
        }
    };

    return (
        <div className="flex h-full min-h-screen flex-col bg-gray-50 text-gray-800 dark:bg-gray-950 dark:text-white">
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onBack}
                        className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        aria-label="Back"
                    >
                        <FiArrowLeft size={21} />
                    </button>

                    <div>
                        <h1 className="text-xl font-semibold">Call History</h1>
                        <p className="text-sm text-gray-500">
                            {calls.length} calls
                        </p>
                    </div>
                </div>

                <button
                    onClick={clearHistory}
                    className="rounded-full p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                    title="Clear call history"
                    aria-label="Clear call history"
                >
                    <FiTrash2 size={20} />
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-3 border-b bg-white px-5 py-3 dark:border-gray-800 dark:bg-gray-900">
                {(["All", "Missed"] as const).map((item) => (
                    <button
                        key={item}
                        onClick={() => setFilter(item)}
                        className={`rounded-full px-5 py-2 text-sm font-medium ${filter === item
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                            }`}
                    >
                        {item === "All" ? "All calls" : "Missed calls"}
                    </button>
                ))}
            </div>

            {/* Call list */}
            <div className="flex-1 overflow-y-auto p-4">
                {filteredCalls.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <FiPhone size={40} className="text-gray-400" />
                        <h2 className="mt-4 font-semibold">No calls found</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Your call history will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="mx-auto max-w-2xl space-y-3">
                        {filteredCalls.map((call) => (
                            <div
                                key={call.id}
                                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
                            >
                                <img
                                    src={call.avatar}
                                    alt={call.name}
                                    className="h-12 w-12 rounded-full object-cover"
                                />

                                <div className="min-w-0 flex-1">
                                    <h3 className="truncate font-semibold">
                                        {call.name}
                                    </h3>

                                    <div className="mt-1 flex items-center gap-1.5 text-sm">
                                        {call.status === "Missed call" ? (
                                            <FiPhoneMissed className="text-red-500" />
                                        ) : call.direction === "incoming" ? (
                                            <FiPhoneIncoming className="text-green-500" />
                                        ) : (
                                            <FiPhoneOutgoing className="text-green-500" />
                                        )}

                                        <span
                                            className={
                                                call.status === "Missed call" ||
                                                    call.status === "Rejected"
                                                    ? "text-red-500"
                                                    : "text-green-600"
                                            }
                                        >
                                            {call.status}
                                        </span>

                                        <span className="text-gray-400">·</span>

                                        {call.type === "video" ? (
                                            <FiVideo className="text-gray-400" />
                                        ) : (
                                            <FiPhone className="text-gray-400" />
                                        )}

                                        <span className="text-gray-500">
                                            {call.type === "video" ? "Video" : "Voice"}
                                        </span>
                                    </div>

                                    <p className="mt-1 text-xs text-gray-400">
                                        {call.dateTime}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CallHistory;
