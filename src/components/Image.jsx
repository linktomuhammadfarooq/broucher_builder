import React from "react";

const Image = ({ add_image, images, type, setImage }) => {
  const hanldeClick = (url) => {
    type === "background" ? setImage(url) : add_image(url);
  };
  return (
    <div className="grid grid-cols-2 gap-2">
      {images.map((item, i) => (
        <div
          key={i}
          onClick={() => hanldeClick(item.image_url)}
          className="w-full h-[90px] overflow-hidden rounded-sm cursor-pointer"
          id={item._id}
        >
          <img
            className="object-fill w-full h-full"
            src={item.image_url}
            alt="image"
          />
        </div>
      ))}
    </div>
  );
};

export default Image;
