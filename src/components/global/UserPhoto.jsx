import useAuthStore from '../store/useAuthStore';
import imagePlaceHolder from "/image-placeholder.jpg";

export default function UserPhoto(props) {
    const user = useAuthStore((state) => state.user);
    const photoURL = user?.photoURL;

    // Don't render if user isn't ready
    if (!user) return null;

    return (
        <img
            src={photoURL || imagePlaceHolder}
            alt="user"
            draggable={false}
            className={props.classes}
        />
    );
}