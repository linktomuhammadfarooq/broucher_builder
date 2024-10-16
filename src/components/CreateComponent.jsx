import React, { useState, useRef, useEffect } from "react";
import CustomEditor from "./CustomEditor";
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
  handleSetText,
}) => {
  const [width, setWidth] = useState(816);
  const [height, setHeight] = useState(1056);
  const [toolbarPosition, setToolbarPosition] = useState("top");
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const editorPosition = editorRef.current.getBoundingClientRect();
      const availableSpaceAbove = editorPosition.top;
      const availableSpaceBelow = window.innerHeight - editorPosition.bottom;

      if (availableSpaceAbove < 160 && availableSpaceBelow > 160) {
        setToolbarPosition("bottom");
      } else {
        setToolbarPosition("top");
      }
    }
  }, [selectItem]);
  const isValidURL = (string) => {
    const res = string.match(
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}([\/\w\.-]*)*\/?$/
    );
    return res !== null;
  };

  // console.log("info?????", info);

  const showTextEditorData = (data) => {
    console.log("Text editor data:", data);
    handleSetText(data);
  };
  //   const resizeElement = (e) => {
  //     e.preventDefault();

  //     const startX = e.clientX; // Starting mouse X position
  //     const startY = e.clientY; // Starting mouse Y position
  //     const startWidth = width; // Starting width of the element
  //     const startHeight = height; // Starting height of the element

  //     const mouseMove = (moveEvent) => {
  //       // Calculate the new dimensions based on mouse movement
  //       const newWidth = Math.max(50, startWidth + (moveEvent.clientX - startX)); // Ensure minimum width
  //       const newHeight = Math.max(
  //         50,
  //         startHeight + (moveEvent.clientY - startY)
  //       ); // Ensure minimum height

  //       // Use functional updates to set the new width and height
  //       setWidth(newWidth);
  //       setHeight(newHeight);
  //     };

  //     const mouseUp = () => {
  //       window.removeEventListener("mousemove", mouseMove); // Unbind the event listeners
  //       window.removeEventListener("mouseup", mouseUp);
  //     };

  //     // Bind the mousemove and mouseup events to the window
  //     window.addEventListener("mousemove", mouseMove);
  //     window.addEventListener("mouseup", mouseUp);
  //   };

  let html = "";

  if (info.name === "main_frame") {
    html = (
      <div
        onClick={() => {
          info.setCurrentComponent(info);
          setSelectItem("");
        }}
        className="hover:border-[2px] hover:border-indigo-500 shadow-md overflow-y-auto"
        style={{
          width: `${info.canvasWidth || width}px`,
          height: `${info.canvasHeight || height}px`,
          //   overflowY: "scroll",
          background: info.color,
          zIndex: info.z_index,
          position: "relative",
        }}
      >
        {info.image && (
          <img className="w-full h-full" src={info.image} alt="image" />
        )}

        {/* <div
          onMouseDown={resizeElement}
          className={`absolute inset-0 cursor-nwse-resize`} 
        ></div> */}
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
        className={`absolute group border-[2px] hover:border-[2px] hover:border-indigo-500 ${
          info.id === selectItem
            ? "border-[2px] border-indigo-500"
            : "border-transparent"
        } `}
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
        className={`absolute group border-[2px] hover:border-[2px] hover:border-indigo-500 ${
          info.id === selectItem
            ? "border-[2px] border-indigo-500"
            : "border-transparent"
        } `}
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
        className={`absolute group border-[2px] hover:border-[2px] hover:border-indigo-500 ${
          info.id === selectItem
            ? "border-[2px] border-indigo-500"
            : "border-transparent"
        } `}
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
    const linkIsValid = isValidURL(info.links); // Check if the link is valid

    html = (
      <div onClick={() => info.setCurrentComponent(info)}>
        <div
         ref={editorRef}
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
          className={`absolute group border-[2px] hover:border-[2px] hover:border-indigo-500 ${
            info.id === selectItem
              ? "border-[2px] border-indigo-500"
              : "border-transparent"
          } `}
        >
          {selectItem === info.id && (
            <Element id={info.id} info={info} exId="" />
          )}
          <div onMouseDown={() => info.moveElement(info.id, info)}>
            {/* <h2
              style={{
                fontSize: info.font + "px",
                fontWeight: info.weight,
                fontFamily: info.fontFamily,
                cursor: linkIsValid ? 'pointer' : 'default', // Change cursor style based on link validity
              }}
              className="w-full h-full"
            >
              {linkIsValid ? (
                <a
                  href={info.links.startsWith("http") ? info.links : `http://${info.links}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" hover:underline"
                >
                  {info.title}
                </a>
              ) : (
                info.title
              )}
            </h2> */}
            <div>
              <CustomEditor
                defaultValue={info.title}
                showTextEditorData={showTextEditorData}
                toolbarPosition={toolbarPosition}
              />
            </div>
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
        className={`absolute group border-[2px] hover:border-[2px] hover:border-indigo-500 ${
          info.id === selectItem
            ? "border-[2px] border-indigo-500"
            : "border-transparent"
        } `}
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
