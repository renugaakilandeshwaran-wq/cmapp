

import { useState } from "react";
import { FiArrowLeft, FiMessageCircle } from "react-icons/fi";

type WallpaperProps = {
    onClose: () => void;
};

const colors = [
    "#F87171", "#FB923C", "#FBBF24",
    "#A3E635", "#4ADE80", "#2DD4BF",
    "#38BDF8", "#60A5FA", "#818CF8",
    "#A78BFA", "#C084FC", "#E879F9",
    "#F472B6", "#FB7185", "#A8A29E",
    "#78716C", "#94A3B8", "#64748B",
    "#334155", "#475569", "#D1D5DB",
];

function Wallpaper({ onClose }: WallpaperProps) {
    const [selectedColor, setSelectedColor] = useState("default");
    const [doodle, setDoodle] = useState(true);

    const handleColorChange = (color: string) => {
        setSelectedColor(color);

        const wallpaper =
            color === "default" ? "#efeae2" : color;

        document.documentElement.style.setProperty(
            "--chat-wallpaper",
            wallpaper
        );

        localStorage.setItem("chat-wallpaper", color);
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-gray-900">
            {/* LEFT SIDE - SETTINGS */}
            <div className="h-full w-full overflow-y-auto px-5 py-5 md:w-[380px] md:shrink-0 md:border-r md:border-gray-200 dark:md:border-gray-700">

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-600 dark:text-gray-300"
                    >
                        <FiArrowLeft size={23} />
                    </button>

                    <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                        Set chat wallpaper
                    </h1>
                </div>

                {/* Doodle Checkbox */}
                <label className="mt-8 flex cursor-pointer items-center justify-between gap-3">
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                        Enable Talk Doodle
                    </span>

                    <input
                        type="checkbox"
                        checked={doodle}
                        onChange={(e) => setDoodle(e.target.checked)}
                        className="h-5 w-5 accent-blue-500"
                    />
                </label>

                <hr className="my-5 border-gray-200 dark:border-gray-700" />

                <h2 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Choose wallpaper
                </h2>

                <div className="grid grid-cols-3 gap-3">

                    {/* Default Color */}
                    <button
                        type="button"
                        onClick={() => handleColorChange("default")}
                        className={`flex aspect-square items-center justify-center border-2 bg-gray-100 text-sm text-gray-700 ${selectedColor === "default"
                            ? "border-blue-500"
                            : "border-gray-200"
                            } `}
                    >
                        Default
                    </button>

                    {/* Color Grid */}
                    {colors.map((color) => (
                        <button
                            key={color}
                            type="button"
                            onClick={() => handleColorChange(color)}
                            aria-label={`Select ${color} wallpaper`}
                            className={`aspect-square border-2 ${selectedColor === color
                                ? "border-blue-500"
                                : "border-transparent"
                                } `}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>

                {/* Mobile Preview */}
                <div className="mt-6 md:hidden">
                    <h2 className="mb-3 text-base font-bold text-gray-800 dark:text-white">
                        Wallpaper Preview
                    </h2>

                    <ChatPreview
                        selectedColor={selectedColor}
                        doodle={doodle}
                    />
                </div>
            </div>

            {/* RIGHT SIDE - FULL HEIGHT PREVIEW */}
            <div className="hidden min-w-0 flex-1 flex-col md:flex">

                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Wallpaper Preview
                    </h2>
                </div>

                <div className="min-h-0 flex-1">
                    <ChatPreview
                        selectedColor={selectedColor}
                        doodle={doodle}
                    />
                </div>
            </div>
        </div>
    );
}

type ChatPreviewProps = {
    selectedColor: string;
    doodle: boolean;
};

function ChatPreview({
    selectedColor,
    doodle,
}: ChatPreviewProps) {
    return (
        <div
            className="h-full min-h-[420px] overflow-y-auto p-5 md:p-8"
            style={{
                backgroundColor:
                    selectedColor === "default"
                        ? "#efeae2"
                        : selectedColor,
                backgroundImage: doodle
                    ? "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25) 2px, transparent 3px), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.05) 2px, transparent 3px)"
                    : "none",
                backgroundSize: "35px 35px",
            }}
        >
            <div className="mx-auto flex max-w-2xl flex-col gap-5">

                {/* Chat Header */}
                <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                        <FiMessageCircle
                            size={20}
                            className="text-gray-600"
                        />
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-800">
                            Talk Contact
                        </p>
                        <p className="text-xs text-gray-500">
                            online
                        </p>
                    </div>
                </div>

                {/* Sample Messages */}
                <div className="w-fit max-w-[85%] rounded-xl bg-white px-4 py-3 text-sm text-gray-800 shadow-sm">
                    Hi! How are you?
                    <p className="mt-1 text-right text-[10px] text-gray-400">
                        10:30 AM
                    </p>
                </div>

                <div className="ml-auto w-fit max-w-[85%] rounded-xl bg-green-100 px-4 py-3 text-sm text-gray-800 shadow-sm">
                    I'm fine, thank you!
                    <p className="mt-1 text-right text-[10px] text-gray-500">
                        10:31 AM ✓✓
                    </p>
                </div>

                <div className="w-fit max-w-[85%] rounded-xl bg-white px-4 py-3 text-sm text-gray-800 shadow-sm">
                    Nice to hear that!
                    <p className="mt-1 text-right text-[10px] text-gray-400">
                        10:32 AM
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Wallpaper;
