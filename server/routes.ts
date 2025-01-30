import type { Express } from "express";
import { createServer, type Server } from "http";
import * as admin from "firebase-admin";

// Initialize Firebase Admin
const initializeFirebaseAdmin = () => {
  try {
    // Check required environment variables
    const projectId = process.env.VITE_FIREBASE_PROJECT_ID?.trim();
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.trim();

    if (!projectId || !clientEmail || !privateKey) {
      console.error('Missing required Firebase Admin configuration:', {
        hasProjectId: !!projectId,
        hasClientEmail: !!clientEmail,
        hasPrivateKey: !!privateKey,
      });
      return false;
    }

    console.log('Initializing Firebase Admin with project:', projectId);

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
    });

    console.log('Firebase Admin initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    return false;
  }
};

// Initialize Firebase Admin before registering routes
const isAdminInitialized = initializeFirebaseAdmin();

export function registerRoutes(app: Express): Server {
  const httpServer = createServer(app);
  return httpServer;
}