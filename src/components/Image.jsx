import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { deleteImage } from "../database/imageService";

const Image = ({ add_image, images, type, setImage }) => {
  const hanldeImageClick = (url) => {
    type === "background" ? setImage(url) : add_image(url);
  };
  return (
    <div className="grid grid-cols-2 gap-2">
      {images.map((item, i) => (
        <div
          key={i}
          onClick={() => hanldeImageClick(item.image_url)}
          className="relative w-full h-[90px] overflow-hidden rounded-sm cursor-pointer group"
          id={item._id}
        >
          <img
            className="object-fill w-full h-full"
            src={item.image_url}
            alt="image"
          />

          {/* Delete Icon on Hover */}
          {/* <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <AiFillDelete
              className="text-red-700 cursor-pointer"
              size={20}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the image click when delete is clicked
                deleteImage(item._id); 
              }}
            />
          </div> */}
        </div>
      ))}
    </div>

  );
};

export default Image;
