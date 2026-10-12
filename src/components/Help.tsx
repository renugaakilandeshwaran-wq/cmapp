
import {
    FiArrowLeft,

    FiHelpCircle,
} from "react-icons/fi";

type HelpProps = {
    onClose: () => void;
};

function Help({ onClose }: HelpProps) {
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
                    Help
                </h1>
            </div>

            {/* Help Icon */}
            <div className="mt-10 flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white">
                    <FiHelpCircle size={30} />
                </div>

                <h2 className="mt-3 text-base font-semibold text-gray-500">
                    Help
                </h2>
            </div>

            {/* Help Options */}
            <div className="mt-5 text-">

                <hr className="border-gray-200 dark:border-gray-700" />
                <p className="py-4 text-sm text-gray-500">
                    Help Center
                </p>
                <hr className="border-gray-200 dark:border-gray-700" />

                <p className="py-4 text-sm text-gray-500">
                    Contact us
                </p>

                <hr className="border-gray-200 dark:border-gray-700" />

                <p className="py-4 text-sm text-gray-500">
                    Licenses
                </p>

                <hr className="border-gray-200 dark:border-gray-700" />

                <p className="py-4 text-sm text-gray-500">
                    Terms and privacy policy
                </p>

                <hr className="border-gray-200 dark:border-gray-700" />

            </div>
        </div>
    );
}

export default Help;

