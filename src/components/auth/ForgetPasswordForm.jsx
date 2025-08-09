import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import styles from "../../assets/css/auth.module.css";

export default function ForgetPasswordForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        const actionCodeSettings = {
            url: `${window.location.origin}/success-screen?type=reset`,
            handleCodeInApp: false,
        };
        const auth = getAuth();
        auth.useDeviceLanguage();
        sendPasswordResetEmail(auth, email, actionCodeSettings)
            .then(() => {
                navigate("/verify-auth/?type=reset");
            })
            .catch((err) => {
                console.error("Error:", err);
            });
    }

    return (
        <form className={styles["input-form"]} onSubmit={handleSubmit}>
            <div>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email (that is binded with the password)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                />
                <label htmlFor="email"></label>
            </div>
            <button type="submit">Next</button>
        </form>
    );
}
