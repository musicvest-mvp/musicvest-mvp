import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  
} from "firebase/firestore";
import { TrackData } from "../pages/home-page";

// Add a new user document
export const addUser = async (
  userId: string,
  data: { email: string; displayName?: string }
) => {
  try {
    await addDoc(collection(db, "users"), {
      ...data,
      userId,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

// Get a user document
export const getUser = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};


// Add a new track
export const addTrack = async (data: {
  title: string;
  creatorId: string;
  url: string;
}) => {
  try {
    await addDoc(collection(db, "tracks"), {
      ...data,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error adding track:", error);
    throw error;
  }
};


// Get all tracks
export const getTracks = async (): Promise<TrackData[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "tracks"));
    const tracks = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, title: data.title, creatorId: data.creatorId, url: data.url, createdAt: data.createdAt, } as TrackData;
    });
    return tracks;
  } catch (error) {
    console.error("Error fetching tracks:", error);
    throw error;
  }
};
