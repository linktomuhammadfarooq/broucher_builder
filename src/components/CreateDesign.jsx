import * as htmlToImage from "html-to-image";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RotateLoader from "react-spinners/RotateLoader";
import { saveDesign } from "../database/designService";

import CreateComponent from "./CreateComponent";

const CreateDesign = () => {
  const ref = useRef();

  const { state } = useLocation();

  const navigate = useNavigate();

  const obj = {
    name: "main_frame",
    type: "rect",
    id: Date.now(),
    height: state.height,
    width: state.width,
    z_index: 1,
    color: "#fff",
    image: "",
  };

  const [loader, setLoader] = useState(false);

  const create_design = async () => {
    const image = await htmlToImage.toBlob(ref.current);
    setLoader(true);
    const design = JSON.stringify(obj);
    const jsonDesign = JSON.parse(design);
    if (!image) {
      setLoader(false);
      return;
    }
    //   const formData = new FormData();
    //   formData.append("design", design);
    //   formData.append("image", image);
    try {
      const designRes = await saveDesign(jsonDesign, image);
      console.log("designRes ", designRes);
      navigate(`/design/${designRes._id}/edit`);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (state && ref.current) {
      create_design();
    } else {
      navigate("/");
    }
  }, [state, ref]);

  return (
    <div className="bg-[#18191B] relative flex items-center justify-center w-full h-full p-[10rem]">
      <div className="relative flex items-center justify-center w-[700px] h-[580px] overflow-auto">
        <div ref={ref} className="relative w-auto h-auto overflow-auto">
          <CreateComponent info={obj} current_component={{}} />
        </div>
      </div>
      {loader && (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black z-[1000]">
          <RotateLoader color="white" />
        </div>
      )}
    </div>
  );
};

export default CreateDesign;
