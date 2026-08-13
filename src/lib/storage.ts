import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Uploads any file to Firebase Storage and returns the public download URL.
 * @param file  The File object to upload.
 * @param path  Full storage path, e.g. "videos/news/uuid.mp4"
 */
export async function uploadFile(file: File, path: string): Promise<string> {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}

/**
 * Uploads an image file to Firebase Storage and returns the public download URL.
 * @param file  The File object to upload.
 * @param path  Full storage path, e.g. "images/chapters/cover-abc123.jpg"
 */
export async function uploadImage(file: File, path: string): Promise<string> {
  return uploadFile(file, path);
}
