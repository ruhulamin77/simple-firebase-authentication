// import logo from './logo.svg';
import { getAuth, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, FacebookAuthProvider, signOut } from 'firebase/auth';
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './firebase/firebase.initialize';

initializeAuthentication();
const GoogleProvider = new GoogleAuthProvider();
const GitHubProvider = new GithubAuthProvider();
const FacebookProvider = new FacebookAuthProvider();



function App() {
  const [user, setUser] = useState({})
  const auth = getAuth();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const logedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(logedInUser)
      }).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, GitHubProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        console.log(result);
        const logedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(logedInUser)
      }).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const handleFacebookSignIn = () => {
    signInWithPopup(auth, FacebookProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        console.log(result.user);
        const logedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(logedInUser)
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      }).catch((error) => {
        // An error happened.
      });
  }

  return (
    <div className="App">

      {!user.name ? <div>
        <button onClick={handleGoogleSignIn}>Google Sign In</button>
        <button onClick={handleGithubSignIn}>Github Sign In</button>
        <button onClick={handleFacebookSignIn}>Facebook Sign In</button>
      </div> :
        <button onClick={handleSignOut}>Sign Out</button>}
      <br />
      {user.name && <div>
        <h1>Welcome {user.name}</h1>
        <h3>I know your email: {user.email}</h3>
        <img src={user.photo} alt="" />
      </div>}

    </div>
  );
}

export default App;
