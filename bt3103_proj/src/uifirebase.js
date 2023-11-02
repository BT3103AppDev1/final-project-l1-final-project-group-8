import firebase from 'firebase/compat/app'

const firebaseConfig = {
    apiKey: "AIzaSyBGc6J6-I2Yg7oQ6mreqDcBUzT-sH0bZTM",
    authDomain: "bt3103-project-cb36b.firebaseapp.com",
    projectId: "bt3103-project-cb36b",
    storageBucket: "bt3103-project-cb36b.appspot.com",
    messagingSenderId: "932977578520",
    appId: "1:932977578520:web:82a495bb026f918c16e96d"
}

firebase.initializeApp(firebaseConfig);

function registerUser(email, password) {
    firebase.auth().createUserWithEmailandPassword(email, password)
    .then((userCredential) => {
        //user registered successfully
        const User = userCredential.user;
        console.log('User registered:', user);
    })
    .catch((error) => {
        //handle errors during registration
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error: ${errorCode} - ${errorMessage}');
    });
}
export default firebase;
export { registerUser };