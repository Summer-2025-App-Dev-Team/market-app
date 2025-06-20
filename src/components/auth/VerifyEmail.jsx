import React, { useState } from "react";
import { sendEmailVerification } from "firebase/auth";

export default function VerifyEmail() {
    
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Verify Your Email</h2>
      <p>We’ve sent a verification link to your email. Please check your inbox and click the link.</p>
      <button>Resend Verification Email</button>
    </div>
  );
}