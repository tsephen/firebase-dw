import type { UserRole } from "./firestore";
import { auth, db } from "./firestore";
import { getErrorMessage } from "./error-handler";

export async function adminDisableUser(userId: string) {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('No authenticated admin');
    
    // First update role to 'disabled'
    await setUserRole(userId, 'disabled', currentUser.uid);

    // Call admin API endpoint to disable auth
    const idToken = await currentUser.getIdToken();
    const response = await fetch(`/api/admin/disableUser?userId=${userId}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${idToken}` }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to disable user');
    }

    return true;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function adminEnableUser(userId: string) {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('No authenticated admin');

    // Call admin API endpoint to enable auth
    const idToken = await currentUser.getIdToken();
    const response = await fetch(`/api/admin/enableUser?userId=${userId}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${idToken}` }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to enable user');
    }

    // Update role to 'user' after enabling
    await setUserRole(userId, 'user', currentUser.uid);

    return true;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}