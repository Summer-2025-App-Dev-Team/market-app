import Login from "./components/Login/Login"
import Header from "./components/Header"

export default function() {
    var currentUser = null;
    return (
        <>
            {currentUser ? (
                <Header />
            ) : (
                <Login/>
            )}
            
        </>
    )
}