import { createServer, type Server } from "http";
import type { Express } from "express";
import admin from 'firebase-admin';

// Use the existing Firebase Admin initialization from index.ts
const isAdminInitialized = admin.apps.length > 0;

export function registerRoutes(app: Express): Server {
  // Admin endpoint to delete user
  app.delete('/api/admin/deleteUser', async (req, res) => {
    try {
      // Admin SDK is initialized in index.ts

      const { userId } = req.query;

      if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'Invalid userId provided' });
      }

      // Proceed with deletion even if user not found in Auth
      try {
        await admin.auth().deleteUser(userId);
        console.log('Deleted from Auth:', userId);
      } catch (error: any) {
        if (error.code !== 'auth/user-not-found') {
          throw error;
        }
        console.log('User already removed from Auth:', userId);
      }

      res.status(200).json({ success: true, message: 'User data cleaned up successfully' });
    } catch (error: any) {
      console.error('Error in delete user request:', error);
      res.status(500).json({ 
        error: error.message || 'Failed to delete user',
        code: error.code 
      });
    }
  });

  // Admin endpoint to disable user
  app.post('/api/admin/disableUser', async (req, res) => {
    try {
      const { userId } = req.query;

      if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'Invalid userId provided' });
      }

      // Disable user account using Admin SDK
      await admin.auth().updateUser(userId, {
        disabled: true
      });
      console.log('Successfully disabled user:', userId);

      res.status(200).json({ message: 'User disabled successfully' });
    } catch (error: any) {
      console.error('Error in disable user request:', error);
      res.status(500).json({ 
        error: error.message || 'Failed to disable user',
        code: error.code 
      });
    }
  });

  // Admin endpoint to enable user
  app.post('/api/admin/enableUser', async (req, res) => {
    try {
      const { userId } = req.query;

      if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'Invalid userId provided' });
      }

      // Update role and enable account
      await admin.auth().updateUser(userId, { disabled: false });
      await admin.firestore().collection('userRoles').doc(userId).update({
        role: 'user',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      res.status(200).json({ success: true });
    } catch (error: any) {
      console.error('Error enabling user:', error);
      res.status(500).json({
        error: error.message || 'Failed to enable user',
        code: error.code
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}