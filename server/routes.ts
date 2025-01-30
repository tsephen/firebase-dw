import { createServer, type Server } from "http";
import type { Express } from "express";
import admin from 'firebase-admin';

// Initialize Firebase Admin
const initializeFirebaseAdmin = () => {
  try {
    // Create service account config from environment variables
    const serviceAccount = {
      type: "service_account",
      project_id: process.env.VITE_FIREBASE_PROJECT_ID,
      private_key_id: "6e2bc9ca1caa27c5f5a373796c6618c60b040d07",
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: "113830555951205398359",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40${process.env.VITE_FIREBASE_PROJECT_ID}.iam.gserviceaccount.com`,
      universe_domain: "googleapis.com"
    };

    if (!admin.apps?.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        databaseURL: `https://${process.env.VITE_FIREBASE_PROJECT_ID}.firebaseio.com`
      });
      console.log('Firebase Admin SDK initialized successfully');
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
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
      }

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