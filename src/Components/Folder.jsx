import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Folder = ({ currentFolder }) => {
  const { id } = useParams();
  const [folder, setFolder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    const folders = JSON.parse(localStorage.getItem("folders"));
    const singleFolder = folders.find((f) => f.id === parseInt(id));
    setFolder(singleFolder);
  }, [id]);

  console.log("Folder contents:", folder?.contents);

  const renderContent = (content) => {
    if (!content || !content.url) return null;

    console.log("Content being rendered:", content);

    try {
      return content.type.startsWith("image/") ? (
        <img
          src={content.url}
          alt={content.name || "Uploaded file"}
        className="h-full w-full object-cover"
        />
      ) : (
        <video
        className="h-full w-full object-cover"

          src={content.url}
          controls
        />
      );
    } catch (error) {
      console.error("Error rendering content:", error);
      return <div>Error displaying file</div>;
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setUploadedFile(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedFile({
          file,
          url: reader.result, // This will be a base64 string
          name: file.name,
          type: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addFile = () => {
    if (!uploadedFile) return;

    // Get current folders from localStorage
    const folders = JSON.parse(localStorage.getItem("folders"));
    
    // Find and update the current folder
    const updatedFolders = folders.map(f => {
      if (f.id === parseInt(id)) {
        return {
          ...f,
          contents: f.contents ? [...f.contents, uploadedFile] : [uploadedFile]
        };
      }
      return f;
    });

    // Update localStorage
    localStorage.setItem("folders", JSON.stringify(updatedFolders));

    // Update local state
    const updatedFolder = updatedFolders.find(f => f.id === parseInt(id));
    setFolder(updatedFolder);
    
    // Reset and close modal
    setUploadedFile(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-w-[200px] py-4 px-6 rounded-lg text-white border-[rgb(75,75,75)]">
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-white font-bold">{folder?.title}</h1>
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
              fill="currentColor"
              d="M11 19h2v-4.175l1.6 1.6L16 15l-4-4l-4 4l1.425 1.4L11 14.825zm-5 3q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h8l6 6v12q0 .825-.587 1.413T18 22zm7-13h5l-5-5z"
            />
          </svg>
          Upload More Files
        </button>
        <Modal
          className="bg-black"
          title="Create Folder"
          open={isModalOpen}
          onCancel={handleCancel}
        >
          <div className="my-4 w-full flex items-center flex-col">
            <div className="flex relative z-[1] transition-all duration-150 text-[rgb(175,175,175)] cursor-pointer items-center justify-start my-4 w-full p-3 bg-transparent border border-[rgb(44,44,44)] rounded-lg  hover:text-white">
              <input
                className="opacity-0 w-full cursor-pointer  after:content-['click to upload'] after:text-white after:absolute after:top-1/2 left-1/2 after:translate-x-[-50%] after:translate-y-[-50%]"
                type="file"
                onChange={(e) => handleFileUpload(e)}
              />
              <div className=" absolute top-1/2 left-1/2 translate-x-[-48%] flex items-center gap-2 translate-y-[-50%] z-[-1]">
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
            onClick={addFile}
            className="my-2 bg-[rgb(51,51,51)] text-white py-2 px-4 rounded-lg"
          >
            Upload File
          </button>
        </Modal>
      </div>
      <div className="grid grid-cols-6 grid-flow-dense">
        {folder?.contents?.length > 0 ? (
          folder.contents.map((content, index) => (
            <div className="my-6 flex flex-col items-center gap-4" key={index}>
              <div className="h-20 w-20 overflow-hidden self-center">
                {renderContent(content)}
              </div>
              <span>{content.name.length <= 13 ?  content.name : content.name.slice(0, 13) + "..."  || `File ${index + 1}`}</span>
            </div>
          ))
        ) : (
          <div className="mt-10 flex items-center justify-center">
            <span className="text-[rgb(175,175,175)]">No contents</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Folder;
