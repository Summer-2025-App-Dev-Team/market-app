import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebase";
import useAuthStore from "../../store/useAuthStore";
import upload from "../../store/upload";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import LoadingModal from "../../global/LoadingModal";
import styles from "../../../assets/css/profile/settings.module.css";

export default function Settings() {
    const user = useAuthStore((state) => state.user);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === undefined) {
            setIsLoading(true);
        }

        // Finished uploading
        setIsLoading(false);
        if (user === null) {
            // Only visible to logged in user
            toast.warn("You are not logged in!");
            navigate("/login");
        }
    }, [user]);

    async function handleSubmit(e) {
        e.preventDefault();
        toast.info('starting upload')

        try {
            const setUser = useAuthStore((state) => state.setUser);

            // Update photoURL
            console.log("Starting upload...");
            const imageURL = image ? await upload([image]) : null;
            console.log("Finished upload!");
            await updateProfile(auth.currentUser, {
                photoURL: imageURL[0].url
            });
            const updatedUser = auth.currentUser;
            setUser(updatedUser, true); // second param is rememberMe
        }
        catch (err) {
            toast.warn('An error occurred changing avatars');
            console.log(err);
        }
        toast.success('Photo uploaded, reload to see it')
    }

    function handleFile(e) {
        const file = e.target.files[0];

        try {
            const imageURL = URL.createObjectURL(file);
            const image = ({
                file: file,
                url: imageURL
            });
            setImage(image);
        }
        catch (err) {
            toast.warn('An error occurred handling the file');
        }
    }

    return (
        <article>
            {isLoading && <LoadingModal />}
            <h1>Settings</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="file" accept="image/*" onChange={handleFile} hidden />
                    {/* Changed from img to svg */}
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"></path></svg>
                    <span>Add new profile picture</span>
                </label>
                <button type="submit" disabled={isLoading}>{isLoading ? "Loading" : "Submit"}</button>
            </form>
        </article>
    )
}