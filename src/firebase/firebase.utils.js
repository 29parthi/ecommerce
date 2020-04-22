import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config={
    apiKey: "AIzaSyBFAEt9Nwn_5PzeSa10h7aIPizE_D1BXcg",
    authDomain: "ecommerce-db-73426.firebaseapp.com",
    databaseURL: "https://ecommerce-db-73426.firebaseio.com",
    projectId: "ecommerce-db-73426",
    storageBucket: "ecommerce-db-73426.appspot.com",
    messagingSenderId: "14957433337",
    appId: "1:14957433337:web:562b77c4d1d67336796d28",
    measurementId: "G-YWBES09CCE"
  };

export const createUserProfileDocument = async(userAuth,additionalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName,email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
    
        }catch(error){
            console.log('error creating user',error.message);
        }
    }

    return userRef;
}
  firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

