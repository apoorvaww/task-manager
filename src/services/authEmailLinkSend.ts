import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

const auth = getAuth();

const sendLink = async(email:string) => {
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
  .then(() => {
    window.localStorage.setItem('emailForSignIn', email);
  })
  .catch((error) => {
    console.log("error: ", error);
  });
}