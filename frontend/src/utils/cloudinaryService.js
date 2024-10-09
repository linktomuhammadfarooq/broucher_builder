const uploadImage = async (file) => {
  const url = `https://api.cloudinary.com/v1_1/dyf01ehj9/upload`;
  const fd = new FormData();
  fd.append("upload_preset", "wc6zpbj6");
  fd.append("tags", "browser_upload"); // Optional - add tags for image admin in Cloudinary
  fd.append("file", file);

  const response = await fetch(url, {
    method: "POST",
    body: fd,
  });
  return await response.json();
};

export { uploadImage };
