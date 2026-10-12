// import { useState } from "react";
// import {
//     FiArrowLeft,
//     FiEdit2,
//     FiPhone,
//     FiVideo,
//     FiImage,
//     FiFileText,
// } from "react-icons/fi";

// type Props = {
//     name: string;
//     onSaveName: (name: string) => void;
//     onBack: () => void;
// };

// function Profile({ name, onSaveName, onBack }: Props) {
//     const [editName, setEditName] = useState(false);
//     const [newName, setNewName] = useState(name);

//     const handleSave = () => {
//         if (!newName.trim()) return;

//         onSaveName(newName);
//         setEditName(false);
//     };

//     return (
//         <div className="flex h-screen flex-1 flex-col bg-gray-50">

//             {/* Header */}
//             <div className="flex items-center gap-3 border-b bg-white px-4 py-3">
//                 <button
//                     onClick={onBack}
//                     className="rounded-full p-2 hover:bg-gray-100"
//                 >
//                     <FiArrowLeft size={22} />
//                 </button>

//                 <h2 className="text-lg font-semibold text-gray-800">
//                     Profile
//                 </h2>
//             </div>

//             {/* Profile content */}
//             <div className="flex-1 overflow-y-auto">

//                 {/* Profile image */}
//                 <div className="flex flex-col items-center bg-white px-4 py-8">
//                     <img
//                         src="https://i.pravatar.cc/150?img=5"
//                         alt="Profile"
//                         className="h-32 w-32 rounded-full object-cover"
//                     />

//                     <button className="mt-3 text-sm font-medium text-green-600">
//                         Change profile photo
//                     </button>
//                 </div>

//                 {/* Name */}
//                 <div className="mt-3 bg-white px-5 py-5">
//                     <p className="text-sm text-gray-400">
//                         Name
//                     </p>

//                     {editName ? (
//                         <div className="mt-2 flex items-center gap-2">

//                             <input
//                                 type="text"
//                                 value={newName}
//                                 onChange={(e) =>
//                                     setNewName(e.target.value)
//                                 }
//                                 className="flex-1 border-b border-green-500 px-1 py-2 outline-none"
//                             />

//                             <button
//                                 onClick={handleSave}
//                                 className="rounded-lg bg-green-500 px-4 py-2 text-sm text-white"
//                             >
//                                 Save
//                             </button>

//                         </div>
//                     ) : (
//                         <div className="mt-2 flex items-center justify-between">

//                             <p className="font-medium text-gray-800">
//                                 {name}
//                             </p>

//                             <button
//                                 onClick={() => {
//                                     setNewName(name);
//                                     setEditName(true);
//                                 }}
//                                 className="rounded-full p-2 hover:bg-gray-100"
//                             >
//                                 <FiEdit2 size={18} />
//                             </button>

//                         </div>
//                     )}

//                     <p className="mt-2 text-xs text-gray-400">
//                         This is your name on CM Chat.
//                     </p>
//                 </div>

//                 {/* About */}
//                 <div className="mt-3 bg-white px-5 py-5">
//                     <p className="text-sm text-gray-400">
//                         About
//                     </p>

//                     <p className="mt-2 text-gray-700">
//                         Hey there! I am using CM Chat.
//                     </p>
//                 </div>

//                 {/* Phone */}
//                 <div className="mt-3 bg-white px-5 py-5">
//                     <p className="text-sm text-gray-400">
//                         Phone
//                     </p>

//                     <p className="mt-2 text-gray-700">
//                         +91 98765 43210
//                     </p>
//                 </div>

//                 {/* Calls */}
//                 <div className="mt-3 bg-white px-5 py-5">

//                     <p className="mb-4 text-sm font-semibold text-gray-500">
//                         Contact
//                     </p>

//                     <div className="flex gap-3">

//                         <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-green-600">
//                             <FiPhone size={19} />
//                             Voice Call
//                         </button>

//                         <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-green-600">
//                             <FiVideo size={19} />
//                             Video Call
//                         </button>

//                     </div>
//                 </div>

//                 {/* Media and Documents */}
//                 <div className="mt-3 bg-white px-5 py-5">

//                     <p className="mb-4 text-sm font-semibold text-gray-500">
//                         Media, Links and Docs
//                     </p>

//                     <div className="grid grid-cols-2 gap-3">

//                         <div className="flex items-center gap-3 rounded-lg border p-4">
//                             <FiImage
//                                 size={22}
//                                 className="text-green-500"
//                             />

//                             <div>
//                                 <p className="text-sm font-medium">
//                                     Media
//                                 </p>

//                                 <p className="text-xs text-gray-400">
//                                     Photos & Videos
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-3 rounded-lg border p-4">
//                             <FiFileText
//                                 size={22}
//                                 className="text-blue-500"
//                             />

//                             <div>
//                                 <p className="text-sm font-medium">
//                                     Documents
//                                 </p>

//                                 <p className="text-xs text-gray-400">
//                                     Files & PDFs
//                                 </p>
//                             </div>
//                         </div>

//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }

// export default Profile;

import {
    FiX,
    FiPhone,
    FiVideo,
    FiImage,
    FiFileText,
} from "react-icons/fi";

import type { Chat } from "../types/chat";

type Props = {
    chat: Chat;
    onClose: () => void;
};

function Profile({ chat, onClose }: Props) {
    return (
        <div className="flex h-full w-full shrink-0 flex-col border-l border-gray-200 bg-white md:w-[350px]">

            {/* ================= HEADER ================= */}
            <div className="flex items-center gap-3 border-b px-4 py-4">

                <button
                    onClick={onClose}
                    className="rounded-full p-2 hover:bg-gray-100"
                >
                    <FiX size={22} />
                </button>

                <h2 className="font-semibold text-gray-800">
                    Contact Info
                </h2>

            </div>

            {/* ================= CONTENT ================= */}
            <div className="flex-1 overflow-y-auto">

                {/* Profile Image */}
                <div className="flex flex-col items-center px-5 py-7">

                    <div className="relative">

                        <img
                            src={chat.avatar}
                            alt={chat.name}
                            className="h-32 w-32 rounded-full object-cover"
                        />

                        {chat.isOnline && (
                            <span className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-4 border-white bg-green-500"></span>
                        )}

                    </div>

                    <h1 className="mt-4 text-xl font-semibold text-gray-800">
                        {chat.name}
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        {chat.isOnline
                            ? "Online"
                            : `Last seen ${chat.lastSeen}`}
                    </p>

                </div>

                {/* Call Buttons */}
                <div className="flex justify-center gap-8 border-y px-5 py-5">

                    <button className="flex flex-col items-center gap-2 text-green-600">
                        <span className="rounded-full bg-green-50 p-3">
                            <FiPhone size={20} />
                        </span>

                        <span className="text-xs">
                            Voice
                        </span>
                    </button>

                    <button className="flex flex-col items-center gap-2 text-green-600">
                        <span className="rounded-full bg-green-50 p-3">
                            <FiVideo size={20} />
                        </span>

                        <span className="text-xs">
                            Video
                        </span>
                    </button>

                </div>

                {/* About */}
                <div className="border-b px-5 py-5">

                    <p className="text-xs font-medium text-gray-400">
                        About
                    </p>

                    <p className="mt-2 text-sm text-gray-700">
                        {chat.about || "No about information"
                        }                    </p>

                </div>

                {/* Phone */}
                <div className="border-b px-5 py-5">

                    <p className="text-xs font-medium text-gray-400">
                        {chat.phone || "No Phone number"}
                    </p>

                    <p className="mt-2 text-sm text-gray-700">
                        +91 98765 43210
                    </p>

                </div>

                {/* Media */}
                <div className="px-5 py-5">

                    <p className="mb-4 text-sm font-semibold text-gray-700">
                        Media, Links and Docs
                    </p>

                    <div className="grid grid-cols-2 gap-3">

                        {/* Media */}
                        <button className="flex items-center gap-3 rounded-lg border p-3 text-left hover:bg-gray-50">

                            <span className="rounded-lg bg-green-50 p-2 text-green-600">
                                <FiImage size={19} />
                            </span>

                            <div>
                                <p className="text-sm font-medium text-gray-700">
                                    Media
                                </p>

                                <p className="text-xs text-gray-400">
                                    Photos
                                </p>
                            </div>

                        </button>

                        {/* Documents */}
                        <button className="flex items-center gap-3 rounded-lg border p-3 text-left hover:bg-gray-50">

                            <span className="rounded-lg bg-blue-50 p-2 text-blue-600">
                                <FiFileText size={19} />
                            </span>

                            <div>
                                <p className="text-sm font-medium text-gray-700">
                                    Docs
                                </p>

                                <p className="text-xs text-gray-400">
                                    Files
                                </p>
                            </div>

                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;