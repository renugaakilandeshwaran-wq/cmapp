import { useRef, useState } from "react";
import {
    FiFileText,
    FiImage,
    FiSend,
    FiSmile,
    FiX,
} from "react-icons/fi";
import { GiPaperClip } from "react-icons/gi";

type Props = {
    onSend: (
        message: string,
        type?: "text" | "image" | "file",
        fileUrl?: string,
        fileName?: string
    ) => void;
};

const emojis = [
    "😀",
    "😂",
    "😍",
    "🥰",
    "😊",
    "😎",
    "😭",
    "😢",
    "😡",
    "👍",
    "❤️",
    "🔥",
    "🎉",
    "👏",
    "🙏",
    "😘",
    "🤣",
    "🤔",
    "🙌",
    "💯",
];

function MessageInput({ onSend }: Props) {
    const [message, setMessage] = useState("");
    const [showAttach, setShowAttach] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);

    const imageInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Send text
    const handleSend = () => {
        if (!message.trim()) return;

        onSend(message, "text");

        setMessage("");
        setShowEmoji(false);
    };

    // Select emoji
    const handleEmojiClick = (emoji: string) => {
        setMessage((prev) => prev + emoji);
    };

    // Select image
    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const imageUrl = URL.createObjectURL(file);

        onSend(
            "",
            "image",
            imageUrl,
            file.name
        );

        e.target.value = "";
        setShowAttach(false);
    };

    // Select document
    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const fileUrl = URL.createObjectURL(file);

        onSend(
            "",
            "file",
            fileUrl,
            file.name
        );

        e.target.value = "";
        setShowAttach(false);
    };

    return (
        <div className="relative border-t bg-white p-3">

            {/* ================= EMOJI PICKER ================= */}

            {showEmoji && (
                <div className="absolute bottom-16 left-3 z-20 w-72 rounded-xl border bg-white p-3 shadow-lg">

                    <div className="grid grid-cols-8 gap-2">

                        {emojis.map((emoji) => (
                            <button
                                key={emoji}
                                type="button"
                                onClick={() =>
                                    handleEmojiClick(emoji)
                                }
                                className="rounded-lg p-1 text-xl hover:bg-gray-100"
                            >
                                {emoji}
                            </button>
                        ))}

                    </div>

                </div>
            )}

            {/* ================= ATTACHMENT MENU ================= */}

            {showAttach && (
                <div className="absolute bottom-16 left-12 z-20 rounded-xl border bg-white p-2 shadow-lg">

                    {/* Image */}

                    <button
                        type="button"
                        onClick={() =>
                            imageInputRef.current?.click()
                        }
                        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm hover:bg-gray-100"
                    >
                        <FiImage
                            size={20}
                            className="text-green-500"
                        />

                        <span>Photos & Videos</span>
                    </button>

                    {/* Document */}

                    <button
                        type="button"
                        onClick={() =>
                            fileInputRef.current?.click()
                        }
                        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm hover:bg-gray-100"
                    >
                        <FiFileText
                            size={20}
                            className="text-blue-500"
                        />

                        <span>Document</span>
                    </button>

                </div>
            )}

            {/* ================= HIDDEN IMAGE INPUT ================= */}

            <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
            />

            {/* ================= HIDDEN FILE INPUT ================= */}

            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                onChange={handleFileChange}
            />

            {/* ================= MESSAGE BAR ================= */}

            <div className="flex items-center gap-2">

                {/* Emoji */}

                <button
                    type="button"
                    onClick={() => {
                        setShowEmoji((prev) => !prev);
                        setShowAttach(false);
                    }}
                    className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                >
                    <FiSmile size={21} />
                </button>

                {/* Attachment */}

                <button
                    type="button"
                    onClick={() => {
                        setShowAttach((prev) => !prev);
                        setShowEmoji(false);
                    }}
                    className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                >
                    {showAttach ? (
                        <FiX size={21} />
                    ) : (
                        <GiPaperClip size={21} />
                    )}
                </button>

                {/* Message input */}

                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) =>
                        setMessage(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSend();
                        }
                    }}
                    className="flex-1 rounded-full bg-gray-100 px-4 py-2.5 outline-none"
                />

                {/* Send */}

                <button
                    type="button"
                    onClick={handleSend}
                    className="rounded-full bg-blue-500 p-3 text-white hover:bg-green-600"
                >
                    <FiSend size={18} />
                </button>

            </div>

        </div>
    );
}

export default MessageInput;