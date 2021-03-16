import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
export const initializeLoginFramework = () => {
  !firebase.apps.length && firebase.initializeApp(firebaseConfig);
};

// google sign in
export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      const { displayName, email } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        success: true,
      };
      return signedInUser;
      // console.log(displayName, email);
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });
};

// fb sign in
export const handleFbSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      const user = result;
      console.log(user);
      return user;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      console.log(errorCode, errorMessage);
    });
};

//sign out
export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((res) => {
      const signedOutUser = {
        isSignedIn: false,
        name: "",
        email: "",
      };
      return signedOutUser;
      // console.log(res);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
// create user
export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.success = true;
      newUserInfo.error = "";
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const errorMessage = error.message;
      const newUserInfo = {};
      newUserInfo.error = errorMessage;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.success = true;
      newUserInfo.error = "";
      return newUserInfo;
    })
    .catch((error) => {
      const errorMessage = error.message;
      const newUserInfo = {};
      newUserInfo.error = errorMessage;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

const updateUserName = (name) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name,
    })
    .then(() => {
      console.log("update successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
