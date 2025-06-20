import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EmailConfirmed() {
  const navigate = useNavigate();

  useEffect(() => {
        const timeout = setTimeout(() => {
        navigate("/sign-in");
        }, 3000);
        return () => clearTimeout(timeout);
    }, []);

  return (
    <div>
      <h2>Email Verified! ✅</h2>
      <p>Redirecting you to sign in...</p>
    </div>
  );
}
