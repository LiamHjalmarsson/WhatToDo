import { Outlet } from "react-router-dom"
import MainNavigation from "./Navigation"


const Root = () => {
    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    )
}


export default Root;