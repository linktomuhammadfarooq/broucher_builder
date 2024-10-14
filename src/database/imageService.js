import { addDoc, collection, getDocs } from "firebase/firestore";
import { uploadImage } from "../utils/cloudinaryService";
import { db } from "./firebase";

const addImage = async (file) => {
  try {
    const imageUrl = await uploadImage(file);
    console.log("Image uploaded successfully ", imageUrl);
    if (imageUrl?.url) {
      const docRef = await addDoc(collection(db, "design-images"), {
        image_url: imageUrl.url,
      });
      return { _id: docRef.id, image_url: imageUrl.url };
    } else {
      return;
    }
  } catch (error) {
    console.error("Error adding document: ", error);
  }
  return null;
};

const getImages = async () => {
  try {
    const images = [];
    const snapshot = await getDocs(collection(db, "design-images"));
    snapshot.forEach((doc) => {
      images.push({ _id: doc.id, ...doc.data() });
    });
    return images;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
  return [];
};

export { addImage, getImages };
