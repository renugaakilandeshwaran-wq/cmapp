import type { Chat } from "../types/chat";

type Props = {
    chat: Chat;
    onClick: () => void;
};

function ChatItem({ chat, onClick }: Props) {
    return (
        <div
            onClick={onClick}
            className="flex cursor-pointer items-center gap-3 border-b border-gray-100 px-4 py-3 transition hover:bg-gray-50"
        >
            {/* Avatar */}
            <div className="relative">
                <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="h-12 w-12 rounded-full object-cover"
                />

                {chat.isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
                )}
            </div>

            {/* Name + Message */}
            <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">
                        {chat.isPinned && "📌 "}
                        {chat.name}
                    </h3>

                    <span className="text-xs text-gray-400">
                        {chat.time}
                    </span>
                </div>

                <div className="mt-1 flex items-center justify-between">
                    <p className="truncate text-sm text-gray-500">
                        {chat.lastMessage}
                    </p>
                    {chat.unreadCount > 0 && (
                        <span className="ml-2 flex h-5 min-w-5 
                        items-center justify-center rounded-full 
                        bg-green-500 px-1 text-xs font-semibold text-white">
                            {chat.unreadCount}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChatItem;