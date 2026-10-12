import Notification from "./Notification";
import { useState } from "react";
import {
    FiBell,
    FiLock,
    FiShield,
    FiMoon,
    FiImage,
    FiInfo,
    FiUser,
    FiCommand,
    FiHelpCircle,
    FiChevronRight,
    FiSun,
    FiMonitor,
    FiArrowLeft,
} from "react-icons/fi";
import Keyboard from "./Keyboard";
import Privacy from "./Privacy";
import Security from "./Security";
import Help from "./Help";
import AccountInfo from "./AccountInfo";
import Wallpaper from "./Wallpaper";

type Theme = "light" | "dark" | "system";

function Settings() {
    const [showWallpaper, setShowWallpaper] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [showTheme, setShowTheme] = useState(false);
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [theme, setTheme] = useState<Theme>("light");
    const [showNotification, setShowNotification] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showSecurity, setShowSecurity] = useState(false);
    const [showAccountInfo, setShowAccountInfo] = useState(false);
    const [selectedTheme, setSelectedTheme] =
        useState<Theme>("light");

    const handleThemeClick = () => {
        setSelectedTheme(theme);
        setShowTheme(true);
    };

    const handleCancel = () => {
        setSelectedTheme(theme);
        setShowTheme(false);
    };

    const handleApply = () => {
        setTheme(selectedTheme);
        const isDark =
            selectedTheme === "dark" ||

            (selectedTheme === "system" &&

                window.matchMedia(
                    "(prefers-color-scheme: dark)"
                ).matches);

        document.documentElement.classList.toggle("dark", isDark);
        localStorage.setItem("cm-chat-theme", selectedTheme);

        setShowTheme(false);
    };

    return (
        <div className="h-screen w-full shrink-0 overflow-y-auto border-r border-gray-200 bg-white md:w-[380px]">

            {/*  HEADER  */}

            <div className="border-b border-gray-300  px-5 py-5">
                <h1 className="text-2xl font-bold text-gray-800">
                    Settings
                </h1>
            </div>

            {/*  PROFILE  */}

            <div className="flex items-center gap-3 border-b border-gray-300 px-5 py-5">

                <img
                    src="https://i.pravatar.cc/150?img=5"
                    alt="Profile"
                    className="h-14 w-14 rounded-full object-cover"
                />

                <div className="min-w-0">
                    <h2 className="font-semibold text-gray-800">
                        Renuga
                    </h2>

                    <p className="mt-1 truncate text-sm text-gray-400">
                        Exploring...
                    </p>
                </div>

            </div>

            {/*  SETTINGS LIST  */}

            {showWallpaper ? (
                <Wallpaper onClose={() => setShowWallpaper(false)} />
            ) : showAccountInfo ? (
                <AccountInfo onClose={() => setShowAccountInfo(false)} />
            ) : showHelp ? (
                <Help onClose={() => setShowHelp(false)} />
            ) : showSecurity ? (
                <Security onClose={() => setShowSecurity(false)} />
            ) : showPrivacy ? (
                <Privacy onClose={() => setShowPrivacy(false)} />
            ) : showNotification ? (
                <Notification onClose={() => setShowNotification(false)} />
            ) : !showTheme ? (
                <div className="py-2">

                    {/* Notifications */}

                    <button
                        type="button"
                        onClick={() => setShowNotification(true)}
                        className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-gray-50">

                        <FiBell
                            size={21}
                            className="text-gray-500"
                        />

                        <span className="flex-1 text-sm text-gray-700">
                            Notifications
                        </span>

                        <FiChevronRight
                            size={18}
                            className="text-gray-400"
                        />

                    </button>

                    {/* Privacy */}

                    <button
                        type="button"
                        onClick={() => setShowPrivacy(true)}
                        className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                        <FiLock
                            size={21}
                            className="text-gray-500"
                        />

                        <span className="flex-1 text-sm text-gray-700">
                            Privacy
                        </span>

                        <FiChevronRight
                            size={18}
                            className="text-gray-400"
                        />

                    </button>

                    {/* Security */}
                    <button
                        type="button"
                        onClick={() => setShowSecurity(true)}
                        className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                        <FiShield
                            size={21}
                            className="text-gray-500"
                        />

                        <span className="flex-1 text-sm text-gray-700">
                            Security
                        </span>

                        <FiChevronRight
                            size={18}
                            className="text-gray-400"
                        />

                    </button>

                    {/* Theme */}

                    <button
                        type="button"
                        onClick={handleThemeClick}
                        className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-gray-50"
                    >

                        <FiMoon
                            size={21}
                            className="text-gray-500"
                        />

                        <div className="flex-1">

                            <p className="text-sm text-gray-700">
                                Theme
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                                {theme === "light"
                                    ? "Light"
                                    : theme === "dark"
                                        ? "Dark"
                                        : "System Default"}
                            </p>

                        </div>

                        <FiChevronRight
                            size={18}
                            className="text-gray-400"
                        />
                    </button>

                    {/* Wallpaper */}

                    <button
                        type="button"
                        onClick={() => setShowWallpaper(true)}
                        className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-gray-50"
                    >
                        <FiImage
                            size={21}
                            className="text-gray-500"
                        />

                        <span className="flex-1 text-sm text-gray-700">
                            Wallpaper
                        </span>

                        <FiChevronRight
                            size={18}
                            className="text-gray-400"
                        />

                    </button>

                    {/* Request Account Info */}

                    <button
                        type="button"
                        onClick={() => setShowAccountInfo(true)}
                        className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-gray-50"
                    >
                        <FiInfo
                            size={21}
                            className="text-gray-500"
                        />

                        <span className="flex-1 text-sm text-gray-700">
                            Request Account Info
                        </span>

                        <FiChevronRight
                            size={18}
                            className="text-gray-400"
                        />

                    </button>

                    {/* Account */}

                    <button className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-gray-50">

                        <FiUser
                            size={21}
                            className="text-gray-500"
                        />

                        <span className="flex-1 text-sm text-gray-700">
                            Account
                        </span>

                        <FiChevronRight
                            size={18}
                            className="text-gray-400"
                        />

                    </button>

                    {/* Keyboard Shortcuts */}

                    <button
                        type="button"
                        onClick={() => setShowKeyboard(true)}
                        className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-gray-50">

                        <FiCommand
                            size={21}
                            className="text-gray-500"
                        />

                        <span className="flex-1 text-sm text-gray-700">
                            Keyboard Shortcuts
                        </span>

                        <FiChevronRight
                            size={18}
                            className="text-gray-400"
                        />

                    </button>

                    {/* Help */}

                    <button
                        type="button"
                        onClick={() => setShowHelp(true)}
                        className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-gray-50"
                    >
                        <FiHelpCircle
                            size={21}
                            className="text-gray-500"
                        />

                        <span className="flex-1 text-sm text-gray-700">
                            Help
                        </span>

                        <FiChevronRight
                            size={18}
                            className="text-gray-400"
                        />

                    </button>

                </div>
            ) : (

                /*  THEME FORM  */

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
                    <button
                        type="button"
                        onClick={() => setShowTheme(false)}
                        className="mb-5 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800"
                    >
                        <FiArrowLeft size={18} />
                        Settings
                    </button>

                    <div className="mx-auto w-full max-w-[360px] rounded-xl border border-gray-200 bg-white p-3 shadow-sm">

                        <h2 className="text-lg font-semibold text-gray-800">
                            Choose Theme
                        </h2>

                        <p className="mt-1 text-xs text-gray-400">
                            Select how CM Chat should look
                        </p>

                        <div className="mt-5 space-y-3">

                            {/* Light */}

                            <label
                                className={`flex cursor-pointer items-center gap-3 rounded-lg  p-3 ${selectedTheme === "light"
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-200"
                                    } `}
                            >
                                <FiSun
                                    className="text-gray-500"
                                />

                                <span className="flex-1 text-sm text-gray-700">
                                    Light
                                </span>

                                <input
                                    type="radio"
                                    name="theme"
                                    checked={
                                        selectedTheme === "light"
                                    }
                                    onChange={() =>
                                        setSelectedTheme("light")
                                    }
                                />

                            </label>

                            {/* Dark */}

                            <label
                                className={`flex cursor-pointer items-center gap-3 rounded-lg  p-3 ${selectedTheme === "dark"
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-200"
                                    } `}
                            >

                                <FiMoon
                                    className="text-gray-500"
                                />

                                <span className="flex-1 text-sm text-gray-700">
                                    Dark
                                </span>

                                <input
                                    type="radio"
                                    name="theme"
                                    checked={
                                        selectedTheme === "dark"
                                    }
                                    onChange={() =>
                                        setSelectedTheme("dark")
                                    }
                                />

                            </label>

                            {/* System Default */}

                            <label
                                className={`flex cursor-pointer item-center gap-3 rounded-lg  p-3 ${selectedTheme === "system"
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-200"
                                    } `}
                            >

                                <FiMonitor
                                    className="text-gray-500"
                                />

                                <span className="flex-1 text-sm text-gray-700">
                                    System Default
                                </span>

                                <input
                                    type="radio"
                                    name="theme"
                                    checked={
                                        selectedTheme === "system"
                                    }
                                    onChange={() =>
                                        setSelectedTheme("system")
                                    }
                                />

                            </label>

                        </div>

                        {/* Buttons */}

                        <div className="mt-6 flex justify-end gap-3">

                            <button
                                type="button"
                                onClick={handleCancel}
                                className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleApply}
                                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
                            >
                                Apply
                            </button>

                        </div>

                    </div>

                </div>
            )}
            {showKeyboard && (
                <Keyboard
                    onClose={() => setShowKeyboard(false)}
                />
            )}


        </div>
    );
}

export default Settings;
