import React, { useState } from "react";
import Element from "./Element";
import ImageCrop from "./ImageCrop";

const CreateComponente = ({
  info,
  current_component,
  removeComponent,
  selectItem,
  setSelectItem,
  startCropping,
  setStartCropping,
  cropComplete,
  setCropComplete,
  handleImageCrop,
}) => {
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(450);
  const isValidURL = (string) => {
    const res = string.match(
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}([\/\w\.-]*)*\/?$/
    );
    return res !== null;
  };
  const resizeElement = (e) => {
    e.preventDefault();

    const startX = e.clientX; // Starting mouse X position
    const startY = e.clientY; // Starting mouse Y position
    const startWidth = width; // Starting width of the element
    const startHeight = height; // Starting height of the element

    const mouseMove = (moveEvent) => {
      // Calculate the new dimensions based on mouse movement
      const newWidth = Math.max(50, startWidth + (moveEvent.clientX - startX)); // Ensure minimum width
      const newHeight = Math.max(
        50,
        startHeight + (moveEvent.clientY - startY)
      ); // Ensure minimum height

      // Use functional updates to set the new width and height
      setWidth(newWidth);
      setHeight(newHeight);
    };

    const mouseUp = () => {
      window.removeEventListener("mousemove", mouseMove); // Unbind the event listeners
      window.removeEventListener("mouseup", mouseUp);
    };

    // Bind the mousemove and mouseup events to the window
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };

  let html = "";

  if (info.name === "main_frame") {
    html = (
      <div
        onClick={() => {
          info.setCurrentComponent(info);
          setSelectItem("");
        }}
        className="hover:border-[2px] hover:border-indigo-500 shadow-md"
        style={{
          width: width + "px",
          height: height + "px",
          background: info.color,
          zIndex: info.z_index,
          position: "relative",
        }}
      >
        {info.image && (
          <img className="w-full h-full" src={info.image} alt="image" />
        )}

        <div
          onMouseDown={resizeElement}
          className={`absolute inset-0 cursor-nwse-resize`} // full size overlay for resizing
        ></div>
      </div>
    );
  }
  if (info.name === "shape" && info.type === "rect") {
    html = (
      <div
        id={info.id}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          opacity: info.opacity,
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className={`absolute group hover:border-[2px] ${
          info.id === selectItem ? "border-[2px]" : ""
        } border-indigo-500`}
      >
        {selectItem === info.id && (
          <Element id={info.id} info={info} exId={`${info.id}r`} />
        )}

        <div
          onMouseDown={() => info.moveElement(info.id, info)}
          id={`${info.id}r`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
          }}
        ></div>
      </div>
    );
  }

  if (info.name === "shape" && info.type === "circle") {
    html = (
      <div
        id={info.id}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className={`absolute group hover:border-[2px] ${
          info.id === selectItem ? "border-[2px]" : ""
        } border-indigo-500`}
      >
        {selectItem === info.id && (
          <Element id={info.id} info={info} exId={`${info.id}c`} />
        )}
        <div
          onMouseDown={() => info.moveElement(info.id, info)}
          id={`${info.id}c`}
          className="rounded-full"
          style={{
            width: info.width + "px",
            height: info.width + "px",
            background: info.color,
            opacity: info.opacity,
          }}
        ></div>
      </div>
    );
  }

  if (info.name === "shape" && info.type === "trangle") {
    html = (
      <div
        id={info.id}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className={`absolute group hover:border-[2px] ${
          info.id === selectItem ? "border-[2px]" : ""
        } border-indigo-500`}
      >
        {selectItem === info.id && (
          <Element id={info.id} info={info} exId={`${info.id}t`} />
        )}

        <div
          onMouseDown={() => info.moveElement(info.id, info)}
          id={`${info.id}t`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath: "polygon(50% 0,100% 100%,0 100%)",
          }}
        ></div>
      </div>
    );
  }
  if (info.name === "text") {
    const linkIsValid = isValidURL(info.title);

    html = (
      <div onClick={() => info.setCurrentComponent(info)}>
        <div
          id={info.id}
          style={{
            left: info.left + "px",
            top: info.top + "px",
            zIndex: info.z_index,
            transform: info.rotate
              ? `rotate(${info.rotate}deg)`
              : "rotate(0deg)",
            padding: info.padding + "px",
            color: info.color,
            opacity: info.opacity,
            fontFamily: info.fontFamily,
          }}
          className={`absolute group hover:border-[2px] ${
            info.id === selectItem ? "border-[2px]" : ""
          } border-indigo-500`}
        >
          {selectItem === info.id && (
            <Element id={info.id} info={info} exId="" />
          )}
          <div onMouseDown={() => info.moveElement(info.id, info)}>
            <h2
              style={{
                fontSize: info.font + "px",
                fontWeight: info.weight,
                fontFamily: info.fontFamily,
              }}
              className="w-full h-full"
            >
              {linkIsValid ? (
                <a
                  href={
                    info.title.startsWith("http")
                      ? info.title
                      : `http://${info.title}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {info.title}
                </a>
              ) : (
                info.title
              )}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (info.name === "image") {
    html = (
      <div
        id={info.id}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
          opacity: info.opacity,
        }}
        className={`absolute group hover:border-[2px] ${
          info.id === selectItem ? "border-[2px]" : ""
        } border-indigo-500`}
      >
        {selectItem === info.id && (
          <Element id={info.id} info={info} exId={`${info.id}img`} />
        )}
        <div
          onMouseDown={() => info.moveElement(info.id, info)}
          className="overflow-hidden"
          id={`${info.id}img`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            borderRadius: `${info.radius}%`,
          }}
        >
          {startCropping ? (
            <ImageCrop
              src={info.image}
              cropComplete={cropComplete}
              setCropComplete={setCropComplete}
              setStartCropping={setStartCropping}
              styles={info}
              handleImageCrop={handleImageCrop}
            />
          ) : (
            <img className="w-full h-full" src={info.image} alt="image" />
          )}
        </div>
      </div>
    );
  }

  return html;
};

export default CreateComponente;
