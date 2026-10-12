
import { useRef, useState } from "react";
import {
    FiCamera,
    FiArrowLeft,
    FiUser,
    FiInfo,
    FiPhone,
    FiCheck,
} from "react-icons/fi";

type ProfileData = {
    name: string;
    about: string;
    phone: string;
    avatar: string;
};

const defaultProfile: ProfileData = {
    name: "Renuga",
    about: "Hey there! I am using CM Chat",
    phone: "",
    avatar: "https://i.pravatar.cc/150?img=5",
};

function getSavedProfile(): ProfileData {
    try {
        const saved = localStorage.getItem("cm-account-profile");

        if (saved) {
            return { ...defaultProfile, ...JSON.parse(saved) };
        }
    } catch {
        // Use default profile if saved data cannot be read
    }

    return defaultProfile;
}

function AccountProfile() {
    const [profile, setProfile] = useState<ProfileData>(getSavedProfile);
    const [savedProfile, setSavedProfile] =
        useState<ProfileData>(getSavedProfile);
    const [savedMessage, setSavedMessage] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const hasChanges =
        profile.name !== savedProfile.name ||
        profile.about !== savedProfile.about ||
        profile.phone !== savedProfile.phone ||
        profile.avatar !== savedProfile.avatar;

    const updateField = (
        field: keyof ProfileData,
        value: string
    ) => {
        setProfile((previous) => ({
            ...previous,
            [field]: value,
        }));
        setSavedMessage(false);
    };

    const handlePhotoChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file");
            event.target.value = "";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert("Please select an image smaller than 2 MB");
            event.target.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === "string") {
                updateField("avatar", reader.result);
            }
        };

        reader.readAsDataURL(file);
        event.target.value = "";
    };

    const handleSave = () => {
        const updatedProfile = {
            ...profile,
            name: profile.name.trim(),
            about: profile.about.trim(),
            phone: profile.phone.trim(),
        };

        if (!updatedProfile.name) {
            alert("Please enter your name");
            return;
        }

        try {
            localStorage.setItem(
                "cm-account-profile",
                JSON.stringify(updatedProfile)
            );

            setProfile(updatedProfile);
            setSavedProfile(updatedProfile);
            setSavedMessage(true);
        } catch {
            alert("Unable to save. Please try a smaller profile photo.");
        }
    };

    const handleCancel = () => {
        setProfile({ ...savedProfile });
        setSavedMessage(false);
    };

    return (
        <div className="h-full min-h-0 w-full overflow-y-auto bg-gray-50 text-gray-800">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-gray-200 bg-white px-5 py-4">
                <FiArrowLeft
                    size={21}
                    className="text-gray-500"
                />
                <h1 className="text-xl font-semibold">
                    Profile
                </h1>
            </div>

            <div className="mx-auto w-full max-w-xl px-5 py-8 sm:px-8">
                {/* Profile Photo */}
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <img
                            src={profile.avatar}
                            alt="Profile"
                            className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-md"
                        />

                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-white shadow hover:bg-blue-600"
                            title="Change profile photo"
                            aria-label="Change profile photo"
                        >
                            <FiCamera size={19} />
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                        />
                    </div>

                    <h2 className="mt-4 text-xl font-semibold">
                        {profile.name || "Your Name"}
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                        Profile details
                    </p>
                </div>

                {/* Name */}
                <div className="mt-9">
                    <label className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-600">
                        <FiUser size={17} />
                        Name
                    </label>

                    <input
                        type="text"
                        value={profile.name}
                        maxLength={50}
                        onChange={(event) =>
                            updateField("name", event.target.value)
                        }
                        placeholder="Enter your name"
                        className="w-full border-b border-gray-300 bg-transparent px-1 py-3 text-base outline-none transition focus:border-blue-500"
                    />

                    <p className="mt-2 text-[11px] text-gray-300">
                        This name is visible to your contacts.
                    </p>
                </div>

                {/* About */}
                <div className="mt-7">
                    <label className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-600">
                        <FiInfo size={17} />
                        About
                    </label>

                    <div className="rounded-xl border border-gray-200 bg-blue-50 px-4 py-3">
                        <textarea
                            value={profile.about}
                            maxLength={150}
                            onChange={(event) =>
                                updateField("about", event.target.value)
                            }
                            placeholder="Write something about yourself"
                            rows={2}
                            className="w-full resize-none bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                        />

                        <p className="text-right text-[10px] text-gray-400">
                            {profile.about.length}/150
                        </p>
                    </div>
                </div>

                {/* Phone */}
                <div className="mt-7">
                    <label className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-600">
                        <FiPhone size={17} />
                        Phone
                    </label>

                    <input
                        type="tel"
                        value={profile.phone}
                        onChange={(event) =>
                            updateField("phone", event.target.value)
                        }
                        placeholder="Enter phone number"
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                    />
                </div>

                {/* Save / Cancel */}
                <div className="mt-8 flex items-center justify-end gap-3">
                    {hasChanges && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={!hasChanges}
                        className={`flex items-center gap-2 rounded-lg border px-6 py-2.5 text-sm font-semibold transition ${hasChanges
                            ? "border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
                            : "cursor-not-allowed border-gray-200 bg-white text-gray-300"
                            }`}
                    >
                        <FiCheck size={17} />
                        Save
                    </button>
                </div>

                {savedMessage && (
                    <p className="mt-4 text-right text-sm text-green-600">
                        Profile updated successfully!
                    </p>
                )}
            </div>
        </div>
    );
}

export default AccountProfile;
