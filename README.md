# Firebase Authentication with Role Management

This project implements a robust Firebase authentication system with comprehensive role management using Firestore. It includes features like multi-provider login (Google, Facebook), email verification, and role-based access control.

## Features

- Firebase Authentication with multiple providers (Email/Password, Google, Facebook)
- Role-based access control with Firestore
- Admin dashboard for user management
- Email verification
- Password reset functionality
- Profile management
- Cascading deletion of user data
- Responsive UI using shadcn/ui components

## Prerequisites

Before you begin, ensure you have:
- Node.js (v16 or higher)
- A Firebase project set up in the Firebase Console

## Setup

1. Clone the repository:
```bash
git clone <your-repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Create a new project (or select an existing one)
   - Add a web app to your project
   - Enable Authentication methods (Email/Password, Google, Facebook)
   - Set up Firestore Database

4. Configure Environment Variables:
   - Copy `.env.template` to `.env`:
     ```bash
     cp .env.template .env
     ```
   - Fill in your Firebase configuration values in `.env`

5. Update Firestore Rules:
   - Go to Firestore Database > Rules
   - Update the rules to:
     ```
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         // Helper functions
         function isSignedIn() {
           return request.auth != null;
         }

         function isAdmin() {
           return isSignedIn() && 
             get(/databases/$(database)/documents/userRoles/$(request.auth.uid)).data.role == 'admin';
         }

         // User roles collection
         match /userRoles/{userId} {
           allow read: if true;
           allow write: if isSignedIn() && (request.auth.uid == userId || isAdmin());
           allow delete: if isAdmin();
         }

         // User preferences collection
         match /userPreferences/{userId} {
           allow read: if isSignedIn() && (request.auth.uid == userId || isAdmin());
           allow write: if isSignedIn() && (request.auth.uid == userId || isAdmin());
           allow delete: if isAdmin();
         }

         // User profiles collection
         match /userProfiles/{userId} {
           allow read: if isSignedIn() && (request.auth.uid == userId || isAdmin());
           allow write: if isSignedIn() && (request.auth.uid == userId || isAdmin());
           allow delete: if isAdmin();
         }

         // User activity logs collection
         match /userActivity/{docId} {
           allow read: if isSignedIn() && 
             (request.auth.uid == resource.data.userId || isAdmin());
           allow write: if isSignedIn() && 
             (request.auth.uid == request.resource.data.userId || isAdmin());
           allow delete: if isAdmin();
         }

         // User sessions collection
         match /userSessions/{docId} {
           allow read: if isSignedIn() && 
             (request.auth.uid == resource.data.userId || isAdmin());
           allow write: if isSignedIn() && 
             (request.auth.uid == request.resource.data.userId || isAdmin());
           allow delete: if isAdmin();
         }
       }
     }
     ```

6. Run the development server:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Development

To start the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── lib/          # Utilities and Firebase configuration
│   │   ├── pages/        # Page components
│   │   └── App.tsx       # Main application component
├── server/               # Express server configuration
└── public/              # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.