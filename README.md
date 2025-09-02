# 📝 TaskManager

A modern Next.js application with Firebase Authentication and Task Management.
### Supports:

🔑 Email/Password Authentication

🔐 Google Sign-In

✉️ (Optional) Email Link / Email Verification

✅ Create, update, and delete tasks

📊 Manage tasks in a clean dashboard

🚀 Features

🔑 Authentication

- Email/Password sign-up & login
- Google OAuth login

📋 Task Management
- Add new tasks with title & description
- Mark tasks as complete / incomplete
- Edit or delete tasks
- Dashboard view with task filters (e.g. Completed, Pending)
📦 Tech Stack
- Next.js 14+ (App Router)
- Firebase Authentication
- Firebase Firestore
- shadcn/ui
- TailwindCSS
- Lucide Icons

⚙️ Setup
1. Clone the repository
```
git clone https://github.com/yourusername/taskmanager.git
```

2. Install dependencies
```
npm install
```

3. Configure Firebase
Create a Firebase project at Firebase Console
Enable Authentication → Email/Password and Google sign-in.
Create a Firestore database (for tasks).
Copy Firebase config and create /lib/firebase.ts:

```
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

Add credentials in .env.local.


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
