import firebase from "firebase/app";
import "firebase/auth";
import { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { userContext } from "../../App";
import firebaseConfig from "./firebase.config";
!firebase.apps.length && firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    success: false,
    error: "",
  });
  const [logInUser, setLogInUser] = useContext(userContext);
  const history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const { displayName, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
        };
        setUser(signedInUser);
        // console.log(displayName, email);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const signedOutUser = {
          isSignedIn: false,
          name: "",
          email: "",
        };
        setUser(signedOutUser);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  //facebook singin
  const handleFbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        const user = result;
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        console.log(errorCode, errorMessage);
      });
  };
  const blurHandler = (e) => {
    let isFormValid = true;
    if (e.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  // from submit handler
  const submitHandler = (e) => {
    //sign up
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          newUserInfo.error = "";
          setUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch((error) => {
          const errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    // sign in
    if (!newUser) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          newUserInfo.error = "";
          setUser(newUserInfo);
          setLogInUser(newUserInfo);
          history.replace(from);
          console.log("sign in user info", res.user);
        })
        .catch((error) => {
          const errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
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
  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onClick={handleSignOut}>Sign out</button>
      ) : (
        <button onClick={handleSignIn}>Sign in</button>
      )}{" "}
      <br />
      <button onClick={handleFbSignIn}>Sign in with Facebook</button>
      {user.isSignedIn && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      <h1>Our Own Authentication</h1>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New User Signup</label>
      <form onSubmit={submitHandler}>
        {newUser && (
          <input
            onBlur={blurHandler}
            type="text"
            name="name"
            placeholder="Your name"
            required
          />
        )}
        <br />
        <input
          onBlur={blurHandler}
          type="text"
          name="email"
          placeholder="Enter your email"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={blurHandler}
          placeholder="Enter your password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign up" : "Sign in"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "created" : "Logged In"} successfully.
        </p>
      )}
    </div>
  );
}

export default Login;
