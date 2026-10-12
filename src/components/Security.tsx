import {
    FiArrowLeft,
    FiLock,
    FiMessageSquare,
    FiPhone,
    FiLink,
    FiMapPin,
    FiCircle,
    FiHelpCircle

} from "react-icons/fi";

type SecurityProps = {
    onClose: () => void;
};

function Security({ onClose }: SecurityProps) {
    const items = [
        {
            icon: FiMessageSquare,
            title: "Text and voice messages",
        },
        {
            icon: FiPhone,
            title: "Audio & Video Calls",
        },
        {
            icon: FiLink,
            title: "Photos, videos & documents",
        },
        {
            icon: FiMapPin,
            title: "Location Sharing",
        },
        {
            icon: FiCircle,
            title: "Status Updates",
        },
    ];


    return (
        <div className="min-h-screen w-full overflow-y-auto bg-white px-5 py-5 dark:bg-gray-900">

            {/* Header */}
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Back to Settings"
                    className="text-gray-600 hover:text-green-600 dark:text-gray-300"
                >
                    <FiArrowLeft size={23} />
                </button>

                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Security
                </h1>
            </div>

            {/* Lock Icon */}
            <div className="mt-10 flex flex-col items-center text-center">

                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-500 dark:bg-green-900">
                    <FiLock
                        size={42}
                        className="text-white dark:text-green-300"
                    />
                </div>

                {/* Heading */}
                <h2 className="mt-6 text-xl font-bold text-gray-800 dark:text-white">
                    Your Chats and calls are private
                </h2>

                {/* Description */}
                <p className="mt-4 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-300">
                    End-to-end encryption keeps your personal
                    messages &amp; call between you and person you
                    choose to communicate with. Not even Talk can
                    read or listen to them. This includes your
                </p>
            </div>

            {/* Security Information */}
            <div className="mx-auto mt-8 max-w-md">

                {items.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className={`flex items-center gap-3 py-5 ${index !== items.length - 1
                                ? "border-b border-gray-200 dark:border-gray-700"
                                : ""
                                } `}
                        >
                            <div className="flex justify-between">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                    <Icon
                                        size={21}
                                        className="text-gray-600 dark:text-gray-300"
                                    />
                                </div>

                                <h3 className="text-sm text-center flex items-center gap-3 text-gray-500 dark:text-white">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    );
                })}

            </div>

            {/* Help Section */}
            <div className="mt-10 flex flex-col items-center pb-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white">
                    <FiHelpCircle size={30} />
                </div>

                <h2 className="mt-3 text-base font-semibold text-gray-500">
                    Help
                </h2>

                <hr className="mt-5 w-full border-gray-200 dark:border-gray-700" />

                <p className="w-full py-4 text-sm text-gray-500">
                    Contact us
                </p>

                <hr className="w-full border-gray-200 dark:border-gray-700" />

                <p className="w-full py-4 text-sm text-gray-500">
                    Licenses
                </p>

                <hr className="w-full border-gray-200 dark:border-gray-700" />

                <p className="w-full py-4 text-sm text-gray-500">
                    Terms and privacy policy
                </p>
            </div>



        </div>
    );

}

export default Security;
