import useAuthStore from '../store/useAuthStore';
import imagePlaceHolder from "/image-placeholder.jpg";

export default function UserPhoto(props) {
    const uid = props.uid;
    const user = useAuthStore((state) => state.user);
    const photoURL = user?.photoURL;

    // Don't render if user isn't ready
    if (user === undefined) {
        return null;
    }

    // Since we are using client-side code, we can't actually get others users' profile picture
    if (user === null || user.uid !== uid) {
        return (
            <img
                src={imagePlaceHolder}
                alt="user"
                draggable={false}
            />
        )
    }

    return (
        <img
            src={photoURL || imagePlaceHolder}
            alt="user"
            draggable={false}
        />
    );
}