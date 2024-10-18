import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BarLoader from "react-spinners/BarLoader";
import RotateLoader from "react-spinners/RotateLoader";
import { addImage, getImages } from "../database/imageService";
import Image from "./Image";

const MyImages = ({
  add_image,
  addNewImage,
  setNewImg,
  handleUpdateCropedImage,
}) => {
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [imgLoader, setImageLoader] = useState(false);

  const image_upload = async (e) => {
    if (e.target.files.length > 0) {
      await onImageUpload(e.target.files[0]);
    }
  };

  const handleGetImages = async () => {
    setImageLoader(true);
    try {
      const images = await getImages();
      setImages(images);
      setImageLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetImages();
  }, []);

  const handleImageUpload = async () => {
    await onImageUpload(addNewImage);
    setNewImg("");
  };

  const onImageUpload = async (file) => {
    try {
      setLoader(true);
      const data = await addImage(file);
      handleGetImages();
      handleUpdateCropedImage(data.image_url);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (addNewImage) handleImageUpload();
  }, [addNewImage]);

  return (
    <div>
      <div
        className="w-full h-[40px] flex justify-center items-center bg-purple-500 cursor-pointer rounded-sm text-white mb-3"
        onClick={() => document.getElementById("image").click()}
      >
        <label className="text-center cursor-pointer" htmlFor="image">
          Upload image
        </label>
        <input
          readOnly={loader}
          onChange={image_upload}
          type="file"
          id="image"
          className="hidden"
        />
      </div>
      {loader && (
        <div className="flex items-center justify-center mb-2">
          <BarLoader color="#fff" />
        </div>
      )}
      <div className="h-[80vh] overflow-x-auto flex justify-start items-start scrollbar-hide">
        {imgLoader ? (
          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black z-[1000]">
            <RotateLoader color="white" />
          </div>
        ) : (
          <Image add_image={add_image} images={images} />
        )}
      </div>
    </div>
  );
};

export default MyImages;
