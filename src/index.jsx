import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import AuthListener from "./components/auth/AuthListener";
// import { initializeApp } from "firebase-admin";
// import { getFirestore, Timestamp } from 'firebase-admin/firestore';
// import { onSchedule } from 'firebase-functions/v2/scheduler';

const root = createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <AuthListener />
        <App />
    </StrictMode>
)