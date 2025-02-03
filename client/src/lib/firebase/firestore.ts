import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, deleteDoc, collection, query, getDocs, writeBatch, where } from "firebase/firestore";
import type { UserRole, UserRoleData } from "./types";
export { auth } from "./auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.trim(),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim(),
  appId: import.meta.env.VITE_FIREBASE_APP_ID?.trim(),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// User role management
export interface UserRoleData {
  role: UserRole;
  updatedAt: string;
  updatedBy?: string;
}

export async function setUserRole(userId: string, role: UserRole, updatedBy?: string) {
  const roleData = {
    role,
    updatedAt: new Date().toISOString(),
    updatedBy: updatedBy || null
  };
  await setDoc(doc(db, 'userRoles', userId), roleData);
}

export async function getUserRole(userId: string): Promise<UserRole> {
  const roleDoc = await getDoc(doc(db, 'userRoles', userId));
  return roleDoc.exists() ? roleDoc.data().role : 'user';
}