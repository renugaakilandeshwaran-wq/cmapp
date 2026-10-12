export type Message = {
    id: string;
    text?: string;
    time: string;
    sender: "me" | "other";
    type: "text" | "image" | "file";
    fileName?: string;
    fileUrl?: string;

};

export type Chat = {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unreadCount: number;
    isOnline: boolean;
    isPinned: boolean;
    lastSeen?: string;
    about?: string;
    phone?: string;

    messages: Message[];


};