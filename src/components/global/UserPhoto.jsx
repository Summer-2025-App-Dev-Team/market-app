import useAuthStore from '../store/useAuthStore';
import imagePlaceHolder from "../../assets/images/image-placeholder.jpg";

export default function UserPhoto() {
    const user = useAuthStore((state) => state.user);
    let photoURL = "";
    try {
        photoURL = user.photoURL;
    }
    catch (err) {
        // Might indicates that the user is not loaded yet
    };

    // Still loading or not logged in
    if (user == null || user == undefined) {
        return null;
    }

    // If the user does not have a photo
    if (!user.photoURL) {
        <img src={imagePlaceHolder} alt="user" draggable={false} />
    }

    return (
        <img src={photoURL} alt="user" draggable={false} />
    )
}