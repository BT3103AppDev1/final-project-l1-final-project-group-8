// Importing specific functions from Firebase auth module
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBGc6J6-I2Yg7oQ6mreqDcBUzT-sH0bZTM",
    authDomain: "bt3103-project-cb36b.firebaseapp.com",
    projectId: "bt3103-project-cb36b",
    storageBucket: "bt3103-project-cb36b.appspot.com",
    messagingSenderId: "932977578520",
    appId: "1:932977578520:web:82a495bb026f918c16e96d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function registerUser(email, password) {
    // Use createUserWithEmailAndPassword directly from auth
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User registered:', user);
            return user; // Make sure to return the user or any other relevant data
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Error: ${errorCode} - ${errorMessage}`);
            throw error; // Re-throw the error to propagate it to the caller
        });
}

function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User logged in:', user);
            return user; // Make sure to return the user or any other relevant data
        })
        .catch((error) => {
            console.error(`Error: ${error.code} - ${error.message}`);
            throw error; // Re-throw the error to propagate it to the caller
        });
}

function logoutUser() {
    // Use signOut directly from auth
    return signOut(auth)
        .then(() => {
            console.log('User logged out successfully');
        })
        .catch((error) => {
            console.error('Error during logout:', error);
            throw error; // Re-throw the error to propagate it to the caller
        });
}

export { registerUser, loginUser, logoutUser, auth };
export default app;
