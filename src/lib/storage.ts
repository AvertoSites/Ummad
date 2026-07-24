import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Uploads a file to Firebase Storage and returns the public download URL.
 * @param file  The File object to upload.
 * @param path  Full storage path, e.g. "images/chapters/cover-abc123.jpg"
 */
export async function uploadImage(file: File, path: string): Promise<string> {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}
