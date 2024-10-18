import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  serverTimestamp,
  query,
  deleteDoc,
} from "firebase/firestore";
import { uploadImage } from "../utils/cloudinaryService";
import { db } from "./firebase";
import toast from "react-hot-toast";

const addImage = async (file) => {
  try {
    const imageUrl = await uploadImage(file);
    if (imageUrl?.url) {
      const docRef = await addDoc(collection(db, "design-images"), {
        image_url: imageUrl.url,
        createdAt: serverTimestamp(), // Add the server timestamp here
      });
      toast.success("Image added successfully ");
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

    const q = query(
      collection(db, "design-images"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      images.push({ _id: doc.id, ...doc.data() });
    });
    return images;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
  return [];
};
const deleteImage = async (id) => {
  try {
    const imageDoc = doc(db, "design-images", id); // Reference to the specific document
    await deleteDoc(imageDoc); // Delete the document from Firestore
    toast.success("Image deleted successfully");
    console.log(`Image with ID ${id} deleted`);
  } catch (error) {
    console.error("Error deleting document: ", error);
    toast.error("Failed to delete image");
  }
};

export { addImage, getImages, deleteImage };
