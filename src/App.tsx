import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatList from "./components/ChatList";
import ChatScreen from "./components/ChatScreen";
import Contacts from "./components/Contacts";
import { chats } from "./data/chats";
import type { Chat } from "./types/chat";
import Settings from "./components/Settings";
import setting from "./assets/setting.png";
import CallHistory from "./components/CallHistory";
import { FiUsers } from "react-icons/fi";
import Groups from "./components/Groups";
import AccountProfile from "./components/AccountProfile";


function App() {
  // Currently selected chat/contact
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  // Current sidebar section
  const [activeTab, setActiveTab] = useState("chats");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    // Sidebar Chats click pannumbothu
    // previous selected chat clear aagum
    if (tab === "chats") {
      setSelectedChat(null);
    }
  };

  // Contact click

  const handleSelectContact = (contact: Chat) => {
    setSelectedChat(contact);
  };

  return (
    <div className="flex h-screen overflow-hidden">

      {/*  SIDEBAR  */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/*  CHATS  */}
      {activeTab === "chats" && (
        <>
          {/* Chat List */}
          <div
            className={`w-full shrink-0 md:block md:w-[380px] ${selectedChat ? "hidden" : "block"
              }`}
          >
            <ChatList
              chats={chats}
              onSelectChat={setSelectedChat}
            />
          </div>

          {/* Chat Screen */}
          <div
            className={`flex min-w-0 flex-1 ${selectedChat
              ? "flex"
              : "hidden md:flex"
              }`}
          >
            {selectedChat ? (
              <ChatScreen
                chat={selectedChat}
                onBack={() =>
                  setSelectedChat(null)
                }
              />
            ) : (
              <div className="hidden flex-1 items-center justify-center bg-gray-100 md:flex">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-600">
                    Welcome to CM Chat
                  </h2>

                  <p className="mt-2 text-gray-400">
                    Select a chat to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </>
      )}



      {/* GROUPS */}
      {activeTab === "groups" && (
        <>
          <div className="w-full shrink-0 md:w-[380px]">
            <Groups
              contacts={chats}
              onSelectGroup={setSelectedChat}
            />
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-center bg-gray-100">
            {selectedChat ? (
              <div className="hidden md:block">
                <p className="text-gray-500">
                  Select a group to start chatting
                </p>
              </div>
            ) : (
              <div className="hidden text-center md:block">
                <FiUsers
                  size={40}
                  className="mx-auto text-gray-400"
                />
                <h2 className="mt-3 text-xl font-semibold text-gray-600">
                  Your Groups
                </h2>
                <p className="mt-2 text-gray-400">
                  Create a group or select one to open it
                </p>
              </div>
            )}
          </div>
        </>
      )}


      {/*  CONTACTS  */}
      {activeTab === "contacts" && (
        <>
          {/* Contacts List */}
          <div
            className={`w-full shrink-0 md:block md:w-[380px] ${selectedChat ? "hidden" : "block"
              }`}
          >
            <Contacts
              contacts={chats}
              onSelectContact={handleSelectContact}
            />
          </div>

          {/* Chat Screen */}
          <div
            className={`flex min-w-0 flex-1 ${selectedChat
              ? "flex"
              : "hidden md:flex"
              }`}
          >
            {selectedChat ? (
              <ChatScreen
                chat={selectedChat}
                onBack={() =>
                  setSelectedChat(null)
                }
              />
            ) : (
              <div className="hidden flex-1 items-center justify-center bg-gray-100 md:flex">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-600">
                    Select a contact
                  </h2>

                  <p className="mt-2 text-gray-400">
                    Choose a contact to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>y+
        </>
      )}

      {/* CALLS */}
      {activeTab === "calls" && (
        <>
          <div className="w-full shrink-0 md:w-[380px]">
            <CallHistory onBack={() => setActiveTab("chats")} />
          </div>

          <div className="hidden min-w-0 flex-1 items-center justify-center bg-gray-100 md:flex">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-600">
                Call History
              </h2>
              <p className="mt-2 text-gray-400">
                Select a call to view details
              </p>
            </div>
          </div>
        </>
      )}



      {/*  SETTINGS  */}
      {activeTab === "settings" && (
        <>
          {/* {settings and contents} */}
          <div className="w-full shrink-0 md:w-[380px]">
            <Settings />
          </div>
          <div className="hidden min-w-0 flex-1 flex-col items-center justify-center bg-gray-50 px-8 md:flex">
            <img src={setting}
              alt="Stay connected"
              className="mb-8 w-full max-w-[250px] rounded-2xl object-cover" />

            <h1 className="text-center text-sm">Select a conversation or start a <span className="text-blue-500">new one</span></h1>
          </div>
        </>
      )}

      {/*  PROFILE  */}

      {/* PROFILE */}
      {activeTab === "profile" && (
        <div className="h-full w-full shrink-0 md:w-[380px]">
          <AccountProfile />
        </div>
      )}


    </div>
  );
}

export default App;