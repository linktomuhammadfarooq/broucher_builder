const { VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_CLOUD_PRESET } = import.meta
  .env;
const uploadImage = async (file) => {
  const url = `https://api.cloudinary.com/v1_1/${VITE_CLOUDINARY_CLOUD_NAME}/upload`;
  const fd = new FormData();
  fd.append("upload_preset", VITE_CLOUDINARY_CLOUD_PRESET);
  fd.append("tags", "browser_upload"); // Optional - add tags for image admin in Cloudinary
  fd.append("file", file);

  const response = await fetch(url, {
    method: "POST",
    body: fd,
  });
  return await response.json();
};

export { uploadImage };
