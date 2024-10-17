import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BarLoader from "react-spinners/BarLoader";
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

  const image_upload = async (e) => {
    if (e.target.files.length > 0) {
      await onImageUpload(e.target.files[0]);
    }
  };

  const handleGetImages = async () => {
    try {
      const images = await getImages();
      setImages(images);
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
      <div className="w-full h-[40px] flex justify-center items-center bg-purple-500 rounded-sm text-white mb-3">
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
        <Image add_image={add_image} images={images} />
      </div>
    </div>
  );
};

export default MyImages;
