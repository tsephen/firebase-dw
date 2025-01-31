export type UserRole = 'user' | 'admin' | 'disabled';

export interface UserRoleData {
  role: UserRole;
  updatedAt: string;
  updatedBy?: string;
}

// Central error type for Firebase operations
export interface FirebaseError extends Error {
  code?: string;
  details?: unknown;
}