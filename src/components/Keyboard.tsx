type KeyboardProps = {
    onClose: () => void;
};
const keys = [
    {
        id: 1,
        name: "Mark as unread",
        cmd: "Cmd",
        shift: "Shift",
        letters: "U"
    },
    {
        id: 2,
        name: "Archive Chat",
        cmd: "Cmd",
        shift: "Shift",
        letters: "E"
    }, {
        id: 3,
        name: "Pin Chat",
        cmd: "Cmd",
        shift: "Shift",
        letters: "P"
    },
    {
        id: 4,
        name: "Search Chat",
        cmd: "Cmd",
        shift: "Shift",
        letters: "F",
    },
    {
        id: 5,
        name: "Next Chat",
        cmd: "",
        shift: "Ctrl",
        letters: "Tab"
    },
    {
        id: 6,
        name: "New Group",
        cmd: "Cmd",
        shift: "Shift",
        letters: "N"
    }, {
        id: 7,
        name: "Increase speed of voice message",
        cmd: "",
        shift: "Shift",
        letters: "."
    },
    {
        id: 8,
        name: "Settings",
        cmd: "",
        shift: "Shift",
        letters: ",",
    },
    {
        id: 9,
        name: "Settings",
        cmd: "",
        shift: "Cmd",
        letters: "G",
    },
    {
        id: 10,
        name: "Mute",
        cmd: "Cmd",
        shift: "Shift",
        letters: "M"
    },
    {
        id: 11,
        name: "Delete Chat",
        cmd: "Cmd",
        shift: "Shift",
        letters: "M"
    }, {
        id: 12,
        name: "Search",
        cmd: "Cmd",
        shift: "Shift",
        letters: "D"
    },
    {
        id: 13,
        name: "Sticker Panel ",
        cmd: "",
        shift: "Cmd",
        letters: "S",
    },
    {
        id: 14,
        name: "New Chat",
        cmd: "",
        shift: "Cmd",
        letters: "N"
    },
    {
        id: 15,
        name: "Previous Chat",
        cmd: "Ctrl",
        shift: "Shift",
        letters: "Tab"
    }, {
        id: 16,
        name: "Profile & About",
        cmd: "",
        shift: "Cmd",
        letters: "P"
    },
    {
        id: 17,
        name: "Decrease speed of voice message",
        cmd: "",
        shift: "Shift",
        letters: ",",
    },
    {
        id: 18,
        name: "Emoji Panel",
        cmd: "",
        shift: "Cmd",
        letters: "E",
    },

]



function Keyboard({ onClose }: KeyboardProps) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-2xl rounded-xl bg-white p-5 shadow-xl">

                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <h1 className="text-sm lg:text-xl text-gray-400">Keyboard Shortcuts</h1>

                </div>
                <div className="mt-4 max-h-[70vh] max-w-3xl space-y-2 overflow-y-auto">
                    {keys.map((item) => (
                        <div
                            className="grid gap-3 items-center p-4 lg:grid-cols-2"
                            key={item.id}>
                            <div className="flex justify-between items-center gap-5 ">
                                <h1 className="">{item.name}</h1>
                                {item.cmd && (
                                    <kbd className="rounded text-center border border-gray-300 bg-gray-50 px-2 py-1 text-xs text-gray-600">
                                        {item.cmd}
                                    </kbd>
                                )}

                                {item.shift && (
                                    <kbd className="rounded text-center border border-gray-300 bg-gray-50 px-2 py-1 text-xs text-center text-gray-600">
                                        {item.shift}
                                    </kbd>
                                )}
                                <kbd className="rounded border border-gray-300 bg-gray-50 px-2 py-1 text-xs text-gray-600">
                                    {item.letters}
                                </kbd>

                            </div>
                        </div>
                    )
                    )}
                </div>
                <div className="mt-5 flex justify-end border-t border-gray-200 pt-4">
                    <button
                        onClick={onClose}
                        type="button"
                        className="bg-blue-500 text-xl w-fit px-2 py-1 rounded-lg text-white"
                    >
                        Ok
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Keyboard;