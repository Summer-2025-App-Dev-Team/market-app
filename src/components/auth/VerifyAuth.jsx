import { useLocation } from "react-router-dom";
import AuthHeading from "./AuthCardHeading";
import styleA from "../../assets/css/verifyauth.module.css";
import styleB from "../../assets/css/auth.module.css";

export default function VerifyAuth() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get("type");

  const message = {
    confirm: {
      title: "Confirmation Email Sent",
      message: "Please check your inbox",
      buttonOnClick: () => {
        // TODO: implement resend email
      },
      buttonText: "Resend Confirmation Email"
    },
    reset: {
      title: "Verification Email Sent",
      message: "Please check your inbox",
      buttonOnClick: () => {
        // TODO: implement resend email
      },
      buttonText: "Resend Verification Email"
    }
  }

  const styles = {
    ...styleA,
    ...styleB
  }

  return (
    <main className={styles["verify-screen"]}>
      <div className={`${styles["auth-card"]} ${styles["verify-card"]}`}>
        <AuthHeading head={message[type].title} />
        <h2>{message[type].message}</h2>
        <button onClick={message[type].buttonOnClick}>{message[type].buttonText}</button>
      </div>
    </main>
  );
}