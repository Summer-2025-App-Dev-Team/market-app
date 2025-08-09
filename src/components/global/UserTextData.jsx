import useAuthStore from "../store/useAuthStore";

export default function UserTextData(props) {
    const dataType = props.type;
    const user = useAuthStore((state) => state.user);

    let data;
    try {
        data = user[dataType];
        // console.log(user);
    } catch (err) {
        // Might indicates that the user is not loaded yet
    }

    // Still loading or not logged in
    if (user == undefined || user == null || !user[dataType]) {
        return null;
    }

    return <span>{data}</span>;
}
