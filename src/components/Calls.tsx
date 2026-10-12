import {
    FiPhoneIncoming,
    FiPhoneOutgoing,
    FiPhoneMissed,
    FiVideo,
} from "react-icons/fi";

type Call = {
    id: number;
    name: string;
    avatar: string;
    type: "incoming" | "outgoing" | "missed";
    callMode: "voice" | "video";
    time: string;
};

const calls: Call[] = [
    {
        id: 1,
        name: "Arun Kumar",
        avatar: "https://i.pravatar.cc/150?img=12",
        type: "incoming",
        callMode: "voice",
        time: "Today, 2:30 PM",
    },
    {
        id: 2,
        name: "Priya",
        avatar: "https://i.pravatar.cc/150?img=45",
        type: "outgoing",
        callMode: "video",
        time: "Today, 1:15 PM",
    },
    {
        id: 3,
        name: "Rahul",
        avatar: "https://i.pravatar.cc/150?img=33",
        type: "missed",
        callMode: "voice",
        time: "Yesterday, 8:20 PM",
    },
    {
        id: 4,
        name: "Divya",
        avatar: "https://i.pravatar.cc/150?img=47",
        type: "incoming",
        callMode: "video",
        time: "Yesterday, 6:10 PM",
    },
];

function Calls() {
    return (
        <div className="h-screen w-full border-r border-gray-200 bg-white md:w-[380px]">
            {/* Header */}
            <div className="border-b bg-white px-5 py-5">
                <h1 className="text-2xl font-bold text-gray-800">
                    Call logs
                </h1>

                <p className="mt-1 text-sm text-gray-400">
                    Your recent calls
                </p>
            </div>

            {/* Call List */}
            <div className="flex-1 overflow-y-auto bg-white">

                {calls.map((call) => (
                    <div
                        key={call.id}
                        className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 hover:bg-gray-50"
                    >

                        {/* Profile */}
                        <img
                            src={call.avatar}
                            alt={call.name}
                            className="h-12 w-12 rounded-full object-cover"
                        />

                        {/* Details */}
                        <div className="min-w-0 flex-1">

                            <h3
                                className={`font-semibold ${call.type === "missed"
                                    ? "text-red-500"
                                    : "text-gray-800"
                                    }`}
                            >
                                {call.name}
                            </h3>

                            <div className="mt-1 flex items-center gap-2">

                                {call.type === "incoming" && (
                                    <FiPhoneIncoming
                                        size={15}
                                        className="text-green-500"
                                    />
                                )}

                                {call.type === "outgoing" && (
                                    <FiPhoneOutgoing
                                        size={15}
                                        className="text-green-500"
                                    />
                                )}

                                {call.type === "missed" && (
                                    <FiPhoneMissed
                                        size={15}
                                        className="text-red-500"
                                    />
                                )}

                                <span className="text-xs text-gray-400">
                                    {call.time}
                                </span>

                            </div>

                        </div>

                        {/* Call mode */}
                        <button className="rounded-full p-2 hover:bg-gray-100">

                            {call.callMode === "video" ? (
                                <FiVideo
                                    size={21}
                                    className="text-gray-600"
                                />
                            ) : (
                                <FiPhoneIncoming
                                    size={20}
                                    className="text-gray-600"
                                />
                            )}

                        </button>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default Calls;