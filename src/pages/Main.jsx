import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsFillImageFill, BsFolder, BsGrid1X2 } from "react-icons/bs";
import { FaCloudUploadAlt, FaShapes, FaTrash } from "react-icons/fa";
import { IoDuplicateOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RxTransparencyGrid } from "react-icons/rx";
import { TfiText } from "react-icons/tfi";
import { useParams } from "react-router-dom";
import BackgroundImages from "../components/BackgroundImages";
import CreateComponente from "../components/CreateComponent";
import Header from "../components/Header";
import InitialImage from "../components/InitialImage";
import TemplateDesign from "../components/main/TemplateDesign";
import MyImages from "../components/MyImages";
import Projects from "../components/Projects";
import { getDesignById } from "../database/designService";
import { dataUrlToFileUsingFetch } from "../utils/imageHelper";

const Main = () => {
  const [selectItem, setSelectItem] = useState("");
  const { design_id } = useParams();
  const [state, setState] = useState("");
  const [current_component, setCurrentComponent] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const [rotate, setRotate] = useState(0);
  const [left, setLeft] = useState("");
  const [top, setTop] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [opacity, setOpacity] = useState("");
  const [zIndex, setzIndex] = useState("");
  const [textLinks, setTextLinks] = useState("");
  const [padding, setPadding] = useState("");
  const [font, setFont] = useState("");
  const [weight, setWeight] = useState("");
  const [text, setText] = useState("");
  const [radius, setRadius] = useState(0);
  const [canvasWidth, setCanvasWidth] = useState(816);
  const [canvasHeight, setCanvasHeight] = useState(1056);
  const [startCropping, setStartCropping] = useState(false);
  const [cropComplete, setCropComplete] = useState(false);
  const [newImg, setNewImg] = useState("");
  // Cropping states end
  const [show, setShow] = useState({
    status: true,
    name: "",
  });
  const [fontFamily, setFontFamily] = useState("font-arial"); // Default font family
  const [selectedHeading, setSelectedHeading] = useState("");
  const fontFamilies = [
    { name: "Roboto", value: "Roboto" },
    { name: "Open Sans", value: "Open Sans" },
    { name: "Arial", value: "Arial" },
    { name: "Georgia", value: "Georgia" },
    { name: "Times New Roman", value: "Times" },
    { name: "Courier New", value: "Courier" },
    { name: "Verdana", value: "Verdana" },
    { name: "Tahoma", value: "Tahoma" },
  ];

  const headingStyles = {
    h1: { fontSize: "32px", fontWeight: 600 },
    h2: { fontSize: "24px", fontWeight: 600 },
    h3: { fontSize: "18.72px", fontWeight: 600 },
    h4: { fontSize: "16px", fontWeight: 600 },
    h5: { fontSize: "13.28px", fontWeight: 600 },
    h6: { fontSize: "10.72px", fontWeight: 600 },
    p: { fontSize: "16px", fontWeight: 400 }, // Assuming normal paragraph styles
  };
  const [components, setComponents] = useState([
    {
      name: "main_frame",
      type: "rect",
      id: Math.floor(Math.random() * 100 + 1),
      height: 650,
      width: 750,
      z_index: 1,
      color: "#000000",
      image: "",
      setCurrentComponent: (a) => setCurrentComponent(a),
    },
  ]);

  const getDefaultText = () => {
    return JSON.parse(
      '{"blocks":[{"key":"8p0km","text":"Add Text","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
    );
  };
  // URL validation function
  const isValidURL = (string) => {
    const res = string.match(
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}([\/\w\.-]*)*\/?$/
    );
    return res !== null;
  };
  const setElements = (type, name) => {
    setState(type);
    setShow({
      state: false,
      name,
    });
  };

  const moveElement = (id, currentInfo) => {
    setCurrentComponent(currentInfo);
    let isMoving = true;

    const currentDiv = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }) => {
      setSelectItem("");
      const getStyle = window.getComputedStyle(currentDiv);
      const left = parseInt(getStyle.left);
      const top = parseInt(getStyle.top);
      if (isMoving) {
        currentDiv.style.left = `${left + movementX}px`;
        currentDiv.style.top = `${top + movementY}px`;
      }
    };

    const mouseUp = (e) => {
      setSelectItem(currentInfo.id);
      isMoving = false;
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      setLeft(parseInt(currentDiv.style.left));
      setTop(parseInt(currentDiv.style.top));
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    currentDiv.ondragstart = function () {
      return false;
    };
  };

  const resizeElement = (id, currentInfo) => {
    setCurrentComponent(currentInfo);

    let isMoving = true;

    const currentDiv = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(currentDiv);
      const width = parseInt(getStyle.width);
      const height = parseInt(getStyle.height);
      if (isMoving) {
        currentDiv.style.width = `${width + movementX}px`;
        currentDiv.style.height = `${height + movementY}px`;
      }
    };

    const mouseUp = (e) => {
      isMoving = false;
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      setWidth(parseInt(currentDiv.style.width));
      setHeight(parseInt(currentDiv.style.height));
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    currentDiv.ondragstart = function () {
      return false;
    };
  };

  const rotateElement = (id, currentInfo) => {
    setCurrentComponent(currentInfo);

    const target = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(target);

      const trans = getStyle.transform;

      const values = trans.split("(")[1].split(")")[0].split(",");

      const angle = Math.round(
        Math.atan2(values[1], values[0]) * (180 / Math.PI)
      );

      let deg = angle < 0 ? angle + 360 : angle;

      if (movementX) {
        deg = deg + movementX;
      }
      target.style.transform = `rotate(${deg}deg)`;
    };

    const mouseUp = (e) => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);

      const getStyle = window.getComputedStyle(target);
      const trans = getStyle.transform;
      const values = trans.split("(")[1].split(")")[0].split(",");
      const angle = Math.round(
        Math.atan2(values[1], values[0]) * (180 / Math.PI)
      );
      let deg = angle < 0 ? angle + 360 : angle;
      setRotate(deg);
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);

    target.ondragstart = function () {
      return false;
    };
  };

  const removeComponent = (id) => {
    const temp = components.filter((c) => c.id !== id);
    setCurrentComponent("");
    setComponents(temp);
  };

  const duplicate = (current) => {
    if (current) {
      setComponents([...components, { ...current, id: Date.now() }]);
    }
  };

  const remove_background = () => {
    const com = components.find((c) => c.id === current_component.id);
    const temp = components.filter((c) => c.id !== current_component.id);
    com.image = "";
    setImage("");
    setComponents([...temp, com]);
  };

  const opacityHandle = (e) => {
    setOpacity(parseFloat(e.target.value));
    setCurrentComponent((prev) => ({
      ...prev,
      opacity: parseFloat(e.target.value),
    }));
  };

  const createShape = (name, type) => {
    setCurrentComponent("");
    const id = Date.now();
    const style = {
      id: id,
      name: name,
      type,
      left: 90,
      top: 250,
      opacity: 1,
      width: 200,
      height: 150,
      rotate,
      z_index: 2,
      color: "#3c3c3d",
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
    };
    setSelectItem(id);
    setCurrentComponent(style);
    setComponents([...components, style]);
  };

  const add_text = (name, type, fontFamily) => {
    setCurrentComponent("");
    const id = Date.now();
    const style = {
      id: id,
      name: name,
      type,
      left: 10,
      top: 10,
      opacity: 1,
      rotate,
      z_index: 10,
      padding: 6,
      font: current_component.font || 20, // Use the font set in current_component
      title: current_component.title || getDefaultText(), // Use the title set (h1, h2, etc.)
      links: current_component.textLinks || textLinks, // Use the title set (h1, h2, etc.)
      weight: current_component.weight || 400,
      color: "#3c3c3d",
      fontFamily: fontFamily,
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
    };

    setWeight("");
    setFont("");
    setSelectItem(id);
    setCurrentComponent(style);
    setComponents([...components, style]);
    setShow({ name: "", status: true });
  };

  const add_image = (img) => {
    setCurrentComponent("");
    const id = Date.now();
    const style = {
      id: id,
      name: "image",
      type: "image",
      left: 90,
      top: 250,
      opacity: 1,
      width: 200,
      height: 150,
      rotate,
      z_index: 2,
      ratius: 0,
      image: img,
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
    };

    setSelectItem(id);
    setCurrentComponent(style);
    setComponents([...components, style]);
  };

  useEffect(() => {
    if (current_component) {
      const index = components.findIndex((c) => c.id === current_component.id);
      const temp = components.filter((c) => c.id !== current_component.id);

      if (current_component.name !== "text") {
        components[index].width = width || current_component.width;
        components[index].height = height || current_component.height;
        components[index].canvasWidth =
          canvasWidth || current_component.canvasWidth;
        components[index].canvasHeight =
          canvasHeight || current_component.canvasHeight;
        components[index].rotate = rotate || current_component.rotate;
      }
      if (current_component.name === "text") {
        components[index].font = font || current_component.font;
        components[index].padding = padding || current_component.padding;
        components[index].weight = weight || current_component.weight;
        components[index].fontFamily =
          fontFamily || current_component.fontFamily;
        components[index].title = text || current_component.title;
        components[index].links = textLinks || current_component.links;
      }
      if (current_component.name === "image") {
        components[index].radius = radius || current_component.radius;
      }

      if (current_component.name === "main_frame" && image) {
        components[index].image = image || current_component.image;
      }
      components[index].color = color || current_component.color;

      if (current_component.name !== "main_frame") {
        components[index].left = left || current_component.left;
        components[index].top = top || current_component.top;
        components[index].opacity = opacity || current_component.opacity;
        components[index].z_index = zIndex || current_component.z_index;
      }
      setComponents([...components]);

      setColor("");
      setWidth("");
      setHeight("");
      setTop("");
      setLeft("");
      setRotate(0);
      setOpacity("");
      setzIndex("");
      setText("");
      setFont("");
      setFontFamily("");
      setTextLinks("");
      setSelectedHeading("");
      // setCanvasHeight("")
      // setCanvasWidth("")
    }
  }, [
    color,
    image,
    left,
    top,
    width,
    height,
    opacity,
    zIndex,
    padding,
    font,
    fontFamily,
    weight,
    text,
    textLinks,
    radius,
    rotate,
    canvasHeight,
    canvasWidth,
  ]);

  useEffect(() => {
    const get_design = async () => {
      try {
        const design = await getDesignById(design_id);
        // const { data } = await api.get(`/api/user-design/${design_id}`);
        // const design1 = data.design;
        // console.log("design :::: ", design1);

        for (let i = 0; i < design.length; i++) {
          design[i].setCurrentComponent = (a) => setCurrentComponent(a);
          design[i].moveElement = moveElement;
          design[i].resizeElement = resizeElement;
          design[i].rotateElement = rotateElement;
          design[i].remove_background = remove_background;
        }
        setComponents(design);
      } catch (error) {
        console.log(error);
      }
    };
    get_design();
  }, [design_id]);

  const handleImageCrop = async (image) => {
    const file = await dataUrlToFileUsingFetch(
      image,
      `${Date.now().toString()}.png`,
      "'image/png'"
    );
    setNewImg(file);
    setStartCropping(false);
    setCropComplete(false);
  };

  console.log("compoenntss , ", components);

  return (
    <div className="h-screen bg-black min-w-screen">
      <Header components={components} design_id={design_id} />
      <div className="flex h-[calc(100%-60px)] w-screen">
        <div className="w-[80px] bg-[#18191B] z-50 h-full text-gray-400 overflow-y-auto">
          <div
            onClick={() => setElements("design", "design")}
            className={` ${
              show.name === "design" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <BsGrid1X2 />
            </span>
            <span className="text-xs font-medium">Design</span>
          </div>

          <div
            onClick={() => setElements("shape", "shape")}
            className={`${
              show.name === "shape" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <FaShapes />
            </span>
            <span className="text-xs font-medium">Shapes</span>
          </div>

          <div
            onClick={() => setElements("image", "uploadImage")}
            className={`${
              show.name === "uploadImage" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <FaCloudUploadAlt />
            </span>
            <span className="text-xs font-medium">Upload</span>
          </div>

          <div
            onClick={() => {
              setElements("text", "text");
              setCurrentComponent("");
            }}
            className={`${
              show.name === "text" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <TfiText />
            </span>
            <span className="text-xs font-medium">Text</span>
          </div>

          <div
            onClick={() => setElements("project", "projects")}
            className={`${
              show.name === "projects" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <BsFolder />
            </span>
            <span className="text-xs font-medium">Project</span>
          </div>

          <div
            onClick={() => setElements("initImage", "images")}
            className={`${
              show.name === "images" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <BsFillImageFill />
            </span>
            <span className="text-xs font-medium">Images</span>
          </div>

          <div
            onClick={() => setElements("background", "background")}
            className={`${
              show.name === "background" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <RxTransparencyGrid />
            </span>
            <span className="text-xs font-medium">Background</span>
          </div>
        </div>
        <div className="h-full w-[calc(100%-75px)]">
          <div
            className={`${
              show.status ? "p-0 -left-[350px]" : "px-8 left-[75px] py-5"
            } bg-[#252627] h-full fixed transition-all w-[350px] z-30 duration-700`}
          >
            <div
              onClick={() => setShow({ name: "", status: true })}
              className="flex absolute justify-center items-center bg-[#252627] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full"
            >
              <MdKeyboardArrowLeft />
            </div>
            {state === "design" && (
              <div>
                <TemplateDesign type="main" />
              </div>
            )}
            {state === "shape" && (
              <div className="grid grid-cols-3 gap-2">
                <div
                  onClick={() => createShape("shape", "rect")}
                  className="h-[90px] bg-[#3c3c3d] cursor-pointer"
                ></div>
                <div
                  onClick={() => createShape("shape", "circle")}
                  className="h-[90px] bg-[#3c3c3d] cursor-pointer rounded-full"
                ></div>
                <div
                  onClick={() => createShape("shape", "trangle")}
                  style={{ clipPath: "polygon(50% 0,100% 100%,0 100%)" }}
                  className="h-[90px] bg-[#3c3c3d] cursor-pointer"
                ></div>
              </div>
            )}
            {state === "image" && (
              <MyImages
                add_image={add_image}
                addNewImage={newImg}
                setNewImg={setNewImg}
                handleRemoveCurrentComponent={() =>
                  removeComponent(current_component?.id)
                }
              />
            )}
            {state === "text" && (
              <div>
                <div className="grid grid-cols-1 gap-2">
                  <div
                    onClick={() => {
                      setCurrentComponent("");
                      add_text("text", "title", "fontFamily");
                    }}
                    className="bg-[#3c3c3d] cursor-pointer font-bold p-3 text-white text-xl rounded-sm"
                  >
                    <h2>Add a Text</h2>
                  </div>
                </div>
              </div>
            )}

            {state === "project" && (
              <Projects type="main" design_id={design_id} />
            )}
            {state === "initImage" && (
              <div className="h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide">
                <InitialImage add_image={add_image} />
              </div>
            )}
            {state === "background" && (
              <div className="h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide">
                <BackgroundImages type="background" setImage={setImage} />
              </div>
            )}
          </div>

          <div className="flex w-full h-full py-2">
            <div
              className={`flex justify-center relative items-center ${
                !current_component ? "w-full" : "w-[calc(100%-250px)] relative"
              }`}
            >
              <div
                id="main_design"
                className="flex items-center justify-center w-auto h-full overflow-y-auto"
              >
                <div className="relative w-full h-full select-none">
                  {components.map((c, i) => (
                    <CreateComponente
                      selectItem={selectItem}
                      setSelectItem={setSelectItem}
                      key={i}
                      info={c}
                      // fontFamily={fontFamily}
                      current_component={current_component}
                      removeComponent={removeComponent}
                      startCropping={startCropping}
                      setStartCropping={setStartCropping}
                      cropComplete={cropComplete}
                      setCropComplete={setCropComplete}
                      handleImageCrop={handleImageCrop}
                      handleSetText={(data) => {
                        setCurrentComponent({
                          ...current_component,
                          title: data,
                        });
                        const updatedComponents = components.map((c) => {
                          if (c.id === current_component.id) {
                            return {
                              ...c,
                              title: data,
                            };
                          }
                          return c;
                        });
                        setComponents(updatedComponents);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            {current_component && (
              <div className="h-full overflow-auto w-[250px] text-gray-300 bg-[#252627] px-3 py-2">
                <div className="flex flex-col items-start justify-start h-full gap-6 px-2 pt-4">
                  {current_component.name !== "main_frame" && (
                    <div className="flex items-center justify-start gap-5">
                      <div
                        onClick={() => removeComponent(current_component?.id)}
                        className="w-[30px] flex justify-center items-center rounded-md cursor-pointer h-[30px] bg-slate-700 hover:bg-slate-800"
                      >
                        <FaTrash />
                      </div>
                      <div
                        onClick={() => duplicate(current_component)}
                        className="w-[30px] flex justify-center items-center rounded-md cursor-pointer h-[30px] bg-slate-700 hover:bg-slate-800"
                      >
                        <IoDuplicateOutline />
                      </div>
                    </div>
                  )}
                  <div className="flex items-start justify-start gap-4">
                    <span>Color : </span>
                    <label
                      className="w-[30px] h-[30px] cursor-pointer rounded-sm"
                      style={{
                        background: `${
                          current_component.color &&
                          current_component.color !== "#fff"
                            ? current_component.color
                            : "gray"
                        }`,
                      }}
                      htmlFor="color"
                    ></label>
                    <input
                      onChange={(e) => setColor(e.target.value)}
                      type="color"
                      className="invisible"
                      id="color"
                    />
                  </div>
                  {/* {current_component.name === "main_frame" &&
                  <>
                  <div className="flex items-start justify-start gap-1">
                    <span className="text-md w-[75px]">Width : </span>
                    <input
                      onChange={(e) => {
                        const newWidth = parseInt(e.target.value, 10);
  
                        setCanvasWidth(newWidth);
                       
                        setCurrentComponent((prev) => ({
                          ...prev,
                          canvasWidth: newWidth, // Set font size
                        }));
                      }}
                      className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                      type="number"
                      step={10}
                      value={canvasWidth || current_component.canvasWidth}
                    />
                  </div>
                  <div className="flex items-start justify-start gap-1">
                    <span className="text-md w-[75px]">Height : </span>
                    <input
                      onChange={(e) => {
                        const newHeight = parseInt(e.target.value, 10);
      
                        setCanvasHeight(newHeight);
                       
                        setCurrentComponent((prev) => ({
                          ...prev,
                          canvasHeight: newHeight, 
                        }));
                      }}
                      className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                      type="number"
                      step={10}
                      value={canvasHeight || current_component.canvasHeight}
                    />
                  </div>
                  </>
                  } */}

                  {current_component.name === "main_frame" &&
                    current_component.image && (
                      <div>
                        <button
                          className="p-[6px] bg-slate-700 text-white rounded-sm"
                          onClick={remove_background}
                        >
                          Remove background
                        </button>
                      </div>
                    )}

                  {current_component.name !== "main_frame" && (
                    <div className="flex flex-col gap-5">
                      <div className="flex items-start justify-start gap-1">
                        <span className="text-md w-[70px]">Opacity : </span>
                        <input
                          onChange={opacityHandle}
                          className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                          type="number"
                          step={0.1}
                          min={0.1}
                          max={1}
                          value={current_component.opacity}
                        />
                      </div>
                      <div className="flex items-start justify-start gap-1">
                        <span className="text-md w-[70px]">Z-Index : </span>
                        <input
                          onChange={(e) => {
                            setzIndex(parseInt(e.target.value));
                            setCurrentComponent((prev) => ({
                              ...prev,
                              z_index: parseInt(e.target.value),
                            }));
                          }}
                          className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                          type="number"
                          step={1}
                          value={current_component.z_index}
                        />
                      </div>
                      {current_component.name === "image" && (
                        <>
                          <div className="flex items-start justify-start gap-1">
                            <span className="text-md w-[70px]">Radius: </span>
                            <input
                              onChange={(e) =>
                                setRadius(parseInt(e.target.value))
                              }
                              className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              step={1}
                              value={current_component.radius}
                            />
                          </div>
                          <div className="flex justify-between gap-2">
                            <button
                              onClick={() => setStartCropping(!startCropping)}
                              className="px-4 py-2 text-xs text-white bg-purple-500 rounded-sm"
                            >
                              {startCropping ? "Cancel Crop" : "Crop"}
                            </button>
                            {startCropping && (
                              <button onClick={() => setCropComplete(true)}>
                                Done
                              </button>
                            )}
                          </div>
                        </>
                      )}
                      {current_component.name === "text" && (
                        <>
                          <div className="flex items-start justify-start gap-1">
                            <span className="text-md w-[70px]">Padding: </span>
                            <input
                              onChange={(e) => {
                                setPadding(parseInt(e.target.value));
                                setCurrentComponent((prev) => ({
                                  ...prev,
                                  padding: parseInt(e.target.value),
                                }));
                              }}
                              className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              step={1}
                              value={current_component.padding}
                            />
                          </div>
                          <div className="flex items-start justify-start gap-1">
                            <span className="text-md w-[75px]">
                              Font size :{" "}
                            </span>
                            <input
                              onChange={(e) => {
                                setFont(parseInt(e.target.value));
                                setCurrentComponent((prev) => ({
                                  ...prev,
                                  font: parseInt(e.target.value), // Set font size
                                }));
                              }}
                              className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              step={1}
                              value={current_component.font}
                            />
                          </div>
                          <div className="flex items-start justify-start gap-1">
                            <span className="text-md w-[70px]">Weight : </span>
                            <input
                              onChange={(e) => {
                                setWeight(parseInt(e.target.value));
                                setCurrentComponent((prev) => ({
                                  ...prev,
                                  weight: parseInt(e.target.value),
                                }));
                              }}
                              className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              step={100}
                              min={100}
                              max={900}
                              value={current_component.weight}
                            />
                          </div>
                          <div className="flex items-start justify-start gap-1">
                            <span className="text-md w-[100px]">
                              Font Family :{" "}
                            </span>
                            <select
                              value={
                                current_component.fontFamily
                                  ? current_component.fontFamily
                                  : fontFamily
                              }
                              onChange={(e) => {
                                const selectedFont = e.target.value;
                                setFontFamily(selectedFont);
                                setCurrentComponent((prev) => ({
                                  ...prev,
                                  fontFamily: selectedFont, // Update current component font family
                                }));
                              }}
                              className="border w-[85px] p-1 border-gray-700 bg-transparent rounded-md outline-none"
                            >
                              {fontFamilies.map((font) => (
                                <option key={font.value} value={font.value}>
                                  {font.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex flex-wrap items-start justify-start gap-1">
                            {Object.keys(headingStyles).map((heading) => (
                              <button
                                key={heading}
                                onClick={() => {
                                  const { fontSize, fontWeight } =
                                    headingStyles[heading];
                                  setCurrentComponent((prev) => ({
                                    ...prev,
                                    font: parseInt(fontSize), // Set font size
                                    weight: fontWeight, // Set font weight
                                  }));
                                  setFont(parseInt(fontSize));
                                  setSelectedHeading(heading);
                                }}
                                className={`p-2 text-white rounded-md cursor-pointer mr-1 ${
                                  selectedHeading === heading
                                    ? "bg-gray-600"
                                    : "bg-gray-700"
                                }`}
                              >
                                {heading.toUpperCase()}
                              </button>
                            ))}
                          </div>
                          <div className="flex flex-col items-start justify-start gap-2">
                            <input
                              onChange={(e) =>
                                setCurrentComponent({
                                  ...current_component,
                                  title: e.target.value,
                                })
                              }
                              className="p-2 bg-transparent border border-gray-700 rounded-md outline-none"
                              type="text"
                              value={current_component.title}
                            />
                            <div className="flex items-start justify-start gap-1">
                              <button
                                onClick={() => setText(current_component.title)}
                                className="px-4 py-2 text-xs text-white bg-purple-500 rounded-sm"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col items-start justify-start gap-2">
                            <input
                              onChange={(e) =>
                                setCurrentComponent({
                                  ...current_component,
                                  links: e.target.value,
                                })
                              }
                              className="p-2 bg-transparent border border-gray-700 rounded-md outline-none"
                              type="text"
                              value={current_component.links}
                            />
                            <button
                              onClick={() => {
                                const link = current_component.links;

                                if (isValidURL(link)) {
                                  setCurrentComponent({
                                    ...current_component,
                                    links: link,
                                  });
                                  setTextLinks(link);
                                  toast.success("Link added successfully!");
                                } else {
                                  toast.error("Please enter a valid URL");
                                }
                              }}
                              className="px-4 py-2 mb-4 text-xs text-white bg-blue-500 rounded-sm"
                            >
                              Add Link
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
