import React, { useState, useEffect } from "react";
import { Button, Modal, Upload } from "antd";
import { Workspaces } from "../Utils/workspaces";
import { Folders } from "../Utils/folders";

const MyLibrary = ({ setWp }) => {
  const [active, setActive] = useState("Videos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [renaming, setRenaming] = useState(false);
  const [folders, setFolders] = useState(() => {
    // Try to get workspaces from localStorage first
    const savedFolders = localStorage.getItem("folders");
    return savedFolders ? JSON.parse(savedFolders) : [...Folders];
  });

  const [folderName, setFolderName] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  const showModal = (folderId = null) => {
    setSelectedFolderId(folderId);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedFolderId(null);
    setFolderName("");
    setUploadedFile(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setUploadedFile(file);
    }
  };

  const addFolder = () => {
    if (!folderName.trim()) return;

    // Find the next id dynamically
    const nextId =
      folders.length > 0 ? Math.max(...folders.map((f) => f.id)) + 1 : 1;

    // Create new folder object
    const newFolder = {
      id: nextId,
      title: folderName,
      contents: uploadedFile ? [uploadedFile.name] : [],
      createdAt: Date.now(),
    };

    // Update the folders state
    const updatedFolders = [...folders, newFolder];
    setFolders(updatedFolders);

    // Reset the input and close modal
    setFolderName("");
    setUploadedFile(null);
    setIsModalOpen(false);
  };

  const handleMenu = (e, id) => {
    e.preventDefault();
    if (selectedFolderId === id && isMenuVisible) {
      // If the same folder is clicked and the menu is visible, toggle it off
      setIsMenuVisible(false);
    } else {
      // Otherwise, set the menu to be visible for the clicked folder
      setSelectedFolderId(id);
      setIsMenuVisible(true);
    }
  };
  const handleRename = (e,id) => {
    e.preventDefault();
    const folder = folders.find((f) => f.id === id);

  };
  return (
    <div className="h-full w-full px-6">
      <article className="flex items-center">
        <p className="text-base text-[rgb(175,175,175)]">My Library</p>
      </article>
      <h1 className="text-white font-bold text-2xl">{active}</h1>
      <div
        style={{ transition: "all ease-in .5s" }}
        className="my-4 flex items-center justify-between "
      >
        <div>
          <button
            onClick={() => setActive("Videos")}
            className={`${
              active === "Videos"
                ? "text-white font-bold bg-[rgb(51,51,51)]"
                : "text-[rgb(175,175,175)] font-normal bg-transparent"
            } py-2 px-6 rounded-full`}
          >
            Videos
          </button>
          <button
            onClick={() => setActive("Archives")}
            className={`${
              active === "Archives"
                ? "text-white font-bold bg-[rgb(51,51,51)]"
                : "text-[rgb(175,175,175)] font-normal bg-transparent"
            } py-2 px-6 rounded-full`}
          >
            Archives
          </button>
        </div>
        <button
          onClick={() => showModal()}
          className="text-[rgb(175,175,175)] rounded-full py-2 px-4 cursor-pointer bg-[rgb(51,51,51)] text-sm hover:text-white flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.3rem"
            height="1.3rem"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M12.414 5H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414zM4 5v14h16V7h-8.414l-2-2zm7 7V9h2v3h3v2h-3v3h-2v-3H8v-2z"
            />
          </svg>
          Create Folder
        </button>
        <Modal
          className="bg-black"
          title="Create Folder"
          open={isModalOpen}
          onOk={addFolder}
          onCancel={handleCancel}
        >
          <div className="my-4 w-full flex items-center flex-col">
            <input
              type="text"
              className="w-full p-3 bg-transparent border border-[rgb(44,44,44)] rounded-lg"
              placeholder="Folder Name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <div className="flex relative transition-all duration-150 text-[rgb(175,175,175)] cursor-pointer items-center justify-start my-4 w-full p-3 bg-transparent border border-[rgb(44,44,44)] rounded-lg  hover:text-white">
              <input
                className="opacity-0 w-full cursor-pointer  after:content-['click to upload'] after:text-white after:absolute after:top-1/2 left-1/2 after:translate-x-[-50%] after:translate-y-[-50%]"
                type="file"
                // accept="mp4,mov"
                onChange={handleFileUpload}
              />
              <div className=" absolute top-1/2 left-1/2 translate-x-[-50%] flex items-center gap-2 translate-y-[-50%]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5rem"
                  height="1.5rem"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M11.5 15.577v-8.65l-2.33 2.33l-.708-.718L12 5l3.539 3.539l-.708.719L12.5 6.927v8.65zM6.616 19q-.691 0-1.153-.462T5 17.384v-2.423h1v2.423q0 .231.192.424t.423.192h10.77q.23 0 .423-.192t.192-.424v-2.423h1v2.423q0 .691-.462 1.153T17.384 19z"
                  />
                </svg>
                <span>
                  {uploadedFile ? uploadedFile.name : "Click Here to upload"}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={addFolder}
            className="my-2 bg-[rgb(51,51,51)] text-white py-2 px-4 rounded-lg"
          >
            Create Folder
          </button>
        </Modal>
      </div>

      <div className="my-10 w-full relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[rgb(175,175,175)] font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 256 256"
            >
              <path
                fill="white"
                d="M224 64h-69.33l-27.74-20.8a16.12 16.12 0 0 0-9.6-3.2H72a16 16 0 0 0-16 16v16H40a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h152.89A15.13 15.13 0 0 0 208 200.89V184h16.89A15.13 15.13 0 0 0 240 168.89V80a16 16 0 0 0-16-16m0 104h-16v-56a16 16 0 0 0-16-16h-69.33L94.93 75.2a16.12 16.12 0 0 0-9.6-3.2H72V56h45.33l29.87 22.4A8 8 0 0 0 152 80h72Z"
              />
            </svg>
            <span>Folders</span>
          </div>
          <div className="text-[rgb(175,175,175)] hover:text-white font-medium flex items-center gap-3 cursor-pointer">
            <span>See All</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2rem"
              height="1.2rem"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 12h16m0 0l-6-6m6 6l-6 6"
              />
            </svg>
          </div>
        </div>
        <div className="overflow-x-auto flex items-start h-[15%]  gap-10 py-6 sidebar">
          {folders.map((folder) => (
            <div className="relative">
              <div
                key={folder.id}
                style={{ transition: "all .3s" }}
                className="min-w-[200px] cursor-pointer py-2 px-3 relative flex items-center justify-between rounded-lg border text-[rgb(175,175,175)] border-[rgb(75,75,75)] bg-none hover:bg-[rgb(51,51,51)] hover:text-white"
                // onClick={() => showModal(folder.id)}
                onContextMenu={(e) => handleMenu(e, folder.id)}
              >
                <div className="flex flex-col">
                  {renaming && selectedFolderId ? (
                    <input
                      type="text"
                      placeholder="enter folder name"
                      onChange={(e)=>handleRename(e,folder.id)}
                      className="w-[50%] p-0 text-sm placeholder:text-sm bg-transparent text-white border rounded-md "
                    />
                  ) : (
                    <span className="font-medium text-white">
                      {folder.title}
                    </span>
                  )}
                  <span className="font-normal text-sm">
                    {folder.contents ? folder.contents.length : 0} Videos
                  </span>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5rem"
                  height="1.5rem"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h4.981l2 2h7.789q.69 0 1.153.463T21 8.616v8.769q0 .69-.462 1.153T19.385 19z"
                  />
                </svg>
              </div>
              <div
                className={`menu rounded-lg ${
                  isMenuVisible && selectedFolderId === folder.id
                    ? "block"
                    : "hidden"
                } bg-black p-2 min-w-[100px] flex flex-col items-start absolute bottom-[-4rem] right-[-3rem] z-10`}
              >
                <button
                  onClick={() => setRenaming(true)}
                  className="text-white py-2 text-start text-xs font-semibold flex items-start gap-2 hover:bg-[rgb(37,34,36)]  border-b border-[rgb(55,55,55)] w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1rem"
                    height="1rem"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    >
                      <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                      <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
                    </g>
                  </svg>
                  Rename
                </button>
                <button className="text-white py-2 text-start text-xs font-semibold flex items-start gap-2 hover:bg-[rgb(37,34,36)]  w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1rem"
                    height="1rem"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyLibrary;
