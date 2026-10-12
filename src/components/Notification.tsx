import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

type NotificationProps = {
    onClose: () => void;
};

function Notification({ onClose }: NotificationProps) {
    const [notifications, setNotifications] = useState(true);
    const [showPreviews, setShowPreviews] = useState(true);
    const [reactionNotifications, setReactionNotifications] = useState(true);
    const [incomingCallRingtone, setIncomingCallRingtone] = useState(true);
    const [sounds, setSounds] = useState(true);


    const handleSave = () => {
        localStorage.setItem("notifications", String(notifications));
        localStorage.setItem("showPreviews", String(showPreviews));
        localStorage.setItem(
            "reactionNotifications",
            String(reactionNotifications)
        );
        localStorage.setItem(
            "incomingCallRingtone",
            String(incomingCallRingtone)
        );
        localStorage.setItem("notificationSounds", String(sounds));
    };

    return (
        <div className="w-full min-h-screen bg-white px-5 py-5 dark:bg-gray-900">

            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-600 hover:text-green-600 dark:text-gray-300"
                    aria-label="Back to Settings"
                >
                    <FiArrowLeft size={22} />
                </button>

                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Notifications
                </h1>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between py-4">
                <span className="text-sm text-gray-700 dark:text-gray-200">
                    Notifications
                </span>

                <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    className="h-4 w-4 accent-blue-600"
                />
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Show Previews */}
            <div className="flex items-center justify-between py-4">
                <span className="text-sm text-gray-700 dark:text-gray-200">
                    Show previews
                </span>

                <input
                    type="checkbox"
                    checked={showPreviews}
                    onChange={(e) => setShowPreviews(e.target.checked)}
                    className="h-4 w-4 accent-blue-600"
                />
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Reaction Notifications */}
            <div className="flex items-center justify-between py-4">
                <span className="text-sm text-gray-700 dark:text-gray-200">
                    Reaction notifications
                </span>

                <input
                    type="checkbox"
                    checked={reactionNotifications}
                    onChange={(e) =>
                        setReactionNotifications(e.target.checked)
                    }
                    className="h-4 w-4 accent-blue-600"
                />
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Incoming Call Ringtone */}
            <div className="flex items-center justify-between py-4">
                <span className="text-sm text-gray-700 dark:text-gray-200">
                    Incoming call ringtone
                </span>

                <input
                    type="checkbox"
                    checked={incomingCallRingtone}
                    onChange={(e) =>
                        setIncomingCallRingtone(e.target.checked)
                    }
                    className="h-4 w-4 accent-blue-600"
                />
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Sounds */}
            <div className="flex items-center justify-between py-4">
                <span className="text-sm text-gray-700 dark:text-gray-200">
                    Sounds
                </span>

                <input
                    type="checkbox"
                    checked={sounds}
                    onChange={(e) => setSounds(e.target.checked)}
                    className="h-4 w-4 text-blue-600"
                />
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Save */}
            <div className="mt-6 flex justify-end">
                <button
                    type="button"
                    onClick={handleSave}
                    className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                    Save
                </button>
            </div>
        </div>
    );

}

export default Notification;
