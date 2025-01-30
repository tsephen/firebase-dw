import { createServer, type Server } from "http";
import type { Express } from "express";
import admin from 'firebase-admin';

// Initialize Firebase Admin
const initializeFirebaseAdmin = () => {
  try {
    const projectId = process.env.VITE_FIREBASE_PROJECT_ID?.trim();
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.trim();

    if (!projectId || !clientEmail || !privateKey) {
      console.error('Missing required Firebase Admin configuration');
      return false;
    }

    if (!admin.apps?.length) {
      const serviceAccount = {
        type: "service_account",
        project_id: projectId,
        private_key: privateKey.replace(/\\n/g, '\n'),
        client_email: clientEmail,
      };

      console.log('Initializing Firebase Admin with service account:', {
        projectId,
        clientEmail,
        privateKeyLength: privateKey.length
      });

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
      });
    }

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
        console.error('Firebase Admin not initialized');
        return res.status(500).json({ error: 'Firebase Admin not initialized' });
      }

      const { userId } = req.query;

      if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'Invalid userId provided' });
      }

      // Delete user directly using Admin SDK
      await admin.auth().deleteUser(userId);
      console.log('Successfully deleted user:', userId);

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: any) {
      console.error('Error in delete user request:', error);
      res.status(500).json({ 
        error: error.message || 'Failed to delete user',
        code: error.code 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}