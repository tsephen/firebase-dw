import { createServer, type Server } from "http";
import type { Express } from "express";
import admin from 'firebase-admin';

// Initialize Firebase Admin
const initializeFirebaseAdmin = () => {
  try {
    // Check required environment variables
    const projectId = process.env.VITE_FIREBASE_PROJECT_ID?.trim();
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.trim();

    if (!projectId || !clientEmail || !privateKey) {
      console.error('Missing required Firebase Admin configuration');
      return false;
    }

    // Initialize the admin SDK with service account
    if (!admin.apps?.length) {
      // Create service account credential
      const serviceAccount = {
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, '\n'),
      };

      // Initialize with admin privileges
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: projectId
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

      try {
        // Verify the requesting user is an admin
        const idToken = authHeader.split('Bearer ')[1];
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const adminUid = decodedToken.uid;

        // Check admin role in Firestore
        const adminRoleDoc = await admin.firestore().collection('userRoles').doc(adminUid).get();
        if (!adminRoleDoc.exists || adminRoleDoc.data()?.role !== 'admin') {
          return res.status(403).json({ error: 'Not authorized to delete users' });
        }

        // Delete the user using Admin SDK
        await admin.auth().deleteUser(userId);
        console.log('Successfully deleted user:', userId);

        res.status(200).json({ message: 'User deleted successfully' });
      } catch (authError: any) {
        console.error('Error in admin delete operation:', authError);
        if (authError.code === 'auth/id-token-expired') {
          return res.status(401).json({ error: 'Authentication token expired' });
        }
        throw authError;
      }
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