# FarmSoc Mobile App

## Authentication

This application uses Firebase for authentication. To set up authentication:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Add a web application to your Firebase project
3. Enable Authentication in Firebase and set up Email/Password sign-in method
4. Copy your Firebase configuration details
5. Update the `.env` file with your Firebase credentials:

```
EXPO_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
```

## Development

To start the development server:

```bash
npm install
npx expo start
``` 