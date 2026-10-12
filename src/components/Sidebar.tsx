import {
    FiMessageCircle,
    FiPhone,
    FiSettings,
    FiUser,
    FiUsers,
} from "react-icons/fi";

type Props = {
    activeTab: string;
    onTabChange: (tab: string) => void;
};

function Sidebar({ activeTab, onTabChange }: Props) {
    const navItems = [
        { id: "chats", label: "Chats", icon: FiMessageCircle },
        { id: "groups", label: "Groups", icon: FiUsers },
        { id: "calls", label: "Calls", icon: FiPhone },
        { id: "settings", label: "Settings", icon: FiSettings },
        { id: "profile", label: "Profile", icon: FiUser },
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden h-screen w-[70px] shrink-0 flex-col items-center border-r border-gray-200 bg-white py-4 md:flex">
                <button
                    onClick={() => onTabChange("profile")}
                    className="mb-8"
                    title="Profile"
                >
                    <img
                        src="https://i.pravatar.cc/150?img=5"
                        alt="Profile"
                        className="h-10 w-10 rounded-full object-cover"
                    />
                </button>

                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            title={item.label}
                            className={`mb-4 rounded-xl p-3 transition ${activeTab === item.id
                                ? "bg-blue-500 text-white"
                                : "text-gray-500 hover:bg-gray-100"
                                }`}
                        >
                            <Icon size={23} />
                        </button>
                    );
                })}

                <div className="my-2 h-px w-9 bg-gray-200" />
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="fixed bottom-0 left-0 z-[100] flex h-[72px] w-full items-center justify-around border-t border-gray-200 bg-white px-2 pb-safe md:hidden">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2 transition ${activeTab === item.id
                                ? "text-blue-500"
                                : "text-gray-500"
                                }`}
                        >
                            <Icon size={22} />
                            <span className="text-xs font-medium">
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </>
    );
}

export default Sidebar;
