import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Folder = ({ currentFolder }) => {
  const { id } = useParams();
  const [folder, setFolder] = useState(null);
  useEffect(() => {
    const folders = JSON.parse(localStorage.getItem("folders"));
    const singleFolder = folders.find((f) => f.id === parseInt(id));
    setFolder(singleFolder);
  }, [id]);
  console.log("id", id);
  console.log("current", currentFolder);
  console.log("fetched", folder);
  return (
    <div className="min-w-[200px] py-4 px-6 rounded-lg  text-white border-[rgb(75,75,75)]">
      <h1 className="text-xl text-white font-bold">{folder?.title}</h1>
      <div>
        {folder?.contents.length > 0 ? (
          folder?.contents?.map((content, index) => {
            // Helper function to check if image exists
            // const newPictures;

            // const image=new Image()
            // image.src = content.url
            return (
              <div className="my-6 flex items-center gap-4" key={index}>
                <div className="h-20 w-20 overflow-hidden">
                  <img
                    src={content}
                    // alt={`${content} ${index + 1}`}
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      objectFit: "cover",
                    }}
                  />{" "}
                </div>
                <span>{content}</span>
              </div>
            );
          })
        ) : (
          <div className="mt-10 flex items-center justify-center">
            <span className="text-[rgb(175,175,175)] ">No contents</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Folder;
