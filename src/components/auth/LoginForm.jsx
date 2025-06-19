import { useState } from "react";
import { auth } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from "firebase/auth";
import useAuthStore from "../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import styles from '../../assets/css/auth.module.css';


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const rememberMe = formData.get("remember-me") === "on" ? true : false;
    setError(null);

    const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;

    try {
      await setPersistence(auth, persistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user, rememberMe);
      navigate("/")
    } catch (err) {
      setError(err.message);
      console.error("Login failed:", err);
    }
  };

  return (
    <form className={styles["input-form"]} onSubmit={handleSubmit}>
      <div>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
        <label htmlFor="email"></label>
      </div>
      <div>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="password"></label>
      </div>
      <div className={styles.utils}>
        <div>
          <input id="remember-me" name="remember-me" type="checkbox" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <Link to={"/forget-password"}>Forget Password?</Link>
      </div>
      <button type="submit">Log in</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
