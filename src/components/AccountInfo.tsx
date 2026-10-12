
import { FiArrowLeft, FiFileText } from "react-icons/fi";

type AccountInfoProps = {
    onClose: () => void;
};

function AccountInfo({ onClose }: AccountInfoProps) {
    return (
        <div className="min-h-screen w-full bg-white px-5 py-5 dark:bg-gray-900">

            {/* Header */}
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-600 dark:text-gray-300"
                >
                    <FiArrowLeft size={23} />
                </button>

                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Request Account Info
                </h1>
            </div>

            {/* Icon */}
            <div className="mt-10 flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white">
                    <FiFileText size={32} />
                </div>

                <h2 className="mt-4 text-lg font-bold text-gray-800 dark:text-white">
                    Request report
                </h2>
            </div>

            {/* Description */}
            <div className="mt-6">
                <hr className="border-gray-200 dark:border-gray-700" />

                <p className="py-5 text-sm leading-6 text-gray-500 dark:text-gray-300">
                    Create a report of your Talk Account Information and
                    settings, which you can access or port to another
                    app. This report does not include your messages.
                </p>
            </div>

        </div>
    );
}

export default AccountInfo;

