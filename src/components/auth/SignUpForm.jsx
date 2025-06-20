import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import React, { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import stylesA from "../../assets/css/auth.module.css";
import stylesB from "../../assets/css/signup.module.css";

const styles = {
  ...stylesA,
  ...stylesB
}

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      setUser(user);

      const actionCodeSettings = {
        url: `${window.location.origin}/email-confirmed`,
        handleCodeInApp: false
      };

      const userDocRef = doc(db, "userListings", userCredential.user.uid);
      await setDoc(userDocRef, {listings: []}); 

      await sendEmailVerification(user, actionCodeSettings);
      navigate("/verify-email");

    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          if (user.emailVerified) {
            setUser(user);
            navigate("/");
          } else {
            await sendEmailVerification(user);
            navigate("/verify-email");
          }
        } catch (signInErr) {
          setError("Email already in use, but login failed. Check your password.");
          console.error("Login after existing signup failed:", signInErr);
        }
      } else {
        setError(err.message);
        console.error("Signup error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles["input-form"]} onSubmit={handleSubmit}>
      <div>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />
        <label htmlFor="name"></label>
      </div>
      <div>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="email"></label>
      </div>
      <div className={styles["password"]}>
        <div className={styles["password-div"]}>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password"></label>
        </div>
        <div className={styles["password-div"]}>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label htmlFor="confirm-password"></label>
        </div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  )
}
