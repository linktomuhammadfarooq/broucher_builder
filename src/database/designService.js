import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { uploadImage } from "../utils/cloudinaryService";
import { db } from "./firebase";

const saveDesign = async (design, image) => {
  try {
    const imageData = await uploadImage(image);
    const url = imageData.url;
    const obj = {
      components: Array.isArray(design) ? design : [design],
      image_url: url,
      created: Timestamp.now(),
      updated: Timestamp.now(),
    };
    const docRef = await addDoc(collection(db, "designs"), obj);
    return { _id: docRef.id, ...design };
  } catch (error) {
    console.error("Error adding document: ", error);
  }
  return null;
};

const updateDesign = async (designId, design, image) => {
  try {
    const imageData = await uploadImage(image);
    const url = imageData.url;

    //   todo delete previous image
    const docRef = await doc(db, "designs", designId);
    await updateDoc(docRef, {
      components: design,
      image_url: url,
      updated: Timestamp.now(),
    });
    console.log("Updated design successfully", designId);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
  return null;
};

const getDesignById = async (id) => {
  try {
    const docRef = doc(db, "designs", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data: ", docSnap.data());
      return docSnap.data().components;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document: ", error);
  }
  return null;
};

const getDesigns = async () => {
  try {
    const designs = [];
    const snapshot = await getDocs(collection(db, "designs"));
    snapshot.forEach((doc) => {
      designs.push({ _id: doc.id, ...doc.data() });
    });
    return designs;
  } catch (error) {
    console.error("Error getting document: ", error);
  }
  return null;
};

const deleteDesign = async (id) => {
  try {
    const designDocRef = doc(db, "designs", id);
    await deleteDoc(designDocRef);
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

export { deleteDesign, getDesignById, getDesigns, saveDesign, updateDesign };
