import type { Express } from "express";
import { createServer, type Server } from "http";
import * as admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

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
  // Admin endpoint to delete user
  app.delete('/api/admin/deleteUser', async (req, res) => {
    try {
      if (!isAdminInitialized) {
        console.error('Firebase Admin not initialized, cannot process delete request');
        return res.status(500).json({ error: 'Firebase Admin not initialized' });
      }

      const { userId } = req.query;
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
      }

      const idToken = authHeader.split('Bearer ')[1];

      // Verify the admin's token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      console.log('Admin token verified for user:', decodedToken.uid);

      // Delete the user
      await getAuth().deleteUser(userId as string);
      console.log('User deleted successfully:', userId);

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: any) {
      console.error('Error deleting user:', error);
      res.status(500).json({ 
        error: error.message || 'Failed to delete user' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}