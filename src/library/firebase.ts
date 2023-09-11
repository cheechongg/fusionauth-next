// ./initAuth.js
import _ from 'lodash';
import { init } from 'next-firebase-auth';

const initAuth = () => {
  init({
    // Use application default credentials (takes precedence over firebaseAdminInitConfig if set)
    // useFirebaseAdminDefaultCredential: true,
    onLoginRequestError: (err) => {
      console.error(err);
    },
    onLogoutRequestError: (err) => {
      console.error(err);
    },
    authPageURL: '/firebase-auth-ssr',
    firebaseClientInitConfig: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY ?? '',
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN ?? '',
    },
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL ?? '',
        // Using JSON to handle newline problems when storing the
        // key as a secret in Vercel. See:
        // https://github.com/vercel/vercel/issues/749#issuecomment-707515089
        privateKey: process.env.FIREBASE_PRIVATE_KEY
          ? JSON.parse(JSON.stringify(process.env.FIREBASE_PRIVATE_KEY))
          : '',
      },
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    },
    // tenantId: 'example-tenant-id', // Optional, only necessary in multi-tenant configuration
    cookies: {
      name: 'ExampleApp', // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: true, // set this to false in local (non-HTTPS) development
      signed: true,
    },
    onVerifyTokenError: (err) => {
      console.error(err);
    },
    onTokenRefreshError: (err) => {
      console.error(err);
    },
    loginAPIEndpoint: '/api/firebase/login',
    logoutAPIEndpoint: '/api/firebase/logout',
  });
};

export default initAuth;
