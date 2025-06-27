import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
import { useRef } from "react"

export default function Root() {
    const mainRef = useRef(null);

    return (
        <>
            <Header scrollTargetRef={mainRef} />
            <main ref={mainRef}>
                <Outlet />
            </main>
            <Footer scrollTargetRef={mainRef} />
        </>
    )
}