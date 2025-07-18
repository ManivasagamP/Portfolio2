import { Outlet } from "react-router-dom"
import Header from "../components/header"

const AppLayout = () => {

    return (
        <div>
            <div className="grid-background"> </div>
            <main className="min-h-screen container-auto mx-auto">
                <Header />
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;  