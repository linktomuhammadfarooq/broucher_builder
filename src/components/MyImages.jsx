import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BarLoader from "react-spinners/BarLoader";
import { addImage, getImages } from "../database/imageService";
import Image from "./Image";

const MyImages = ({
  add_image,
  addNewImage,
  setNewImg,
  handleRemoveCurrentComponent,
}) => {
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const image_upload = async (e) => {
    if (e.target.files.length > 0) {
      await imageUpload(e.target.files[0]);
    }
  };

  const get_images = async () => {
    try {
      const images = await getImages();
      console.log("images :: ", images);
      setImages(images);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_images();
  }, [images]);

  const handleImageUpload = async () => {
    await imageUpload(addNewImage);
    setNewImg("");
  };

  const imageUpload = async (file) => {
    try {
      setLoader(true);
      // const formData = new FormData();
      // formData.append("image", file);
      // const { dataa } = await api.post("/api/add-user-image", formData);
      // console.log("dataa ", dataa);
      const data = await addImage(file);
      console.log("image uploaded successfully ", data.image_url);
      setImages([...images, data.image_url]);
      handleRemoveCurrentComponent();
      setTimeout(() => {
        const id = data.userImage._id;
        document.getElementById(id).click();
      }, 500);
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
