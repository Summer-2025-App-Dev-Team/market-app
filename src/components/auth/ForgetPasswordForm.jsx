import { useState } from "react"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import styleA from "../../assets/css/auth.module.css"
import styleB from "../../assets/css/forgetpassword.module.css"


const styles = {
    ...styleA,
    ...styleB
}

export default function ForgetPasswordForm() {
    const [email, setEmail] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        const auth = getAuth();
        auth.useDeviceLanguage();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("Email sent!");

                document.getElementById("forget-password").style.display = "none";
                document.getElementById("success-screen").classList.add(styles["show"]);
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
    )
}