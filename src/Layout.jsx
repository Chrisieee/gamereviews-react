import {Link, Outlet} from "react-router"

function Layout() {
    return (
        <div className={"h-screen flex flex-col justify-between w-screen"}>
            <header className={"text-center p-2 border-b-5 border-blue-700 bg-blue-400"}>
                <h1 className={"text-4xl font-bold"}>Welkom op deze pagina!</h1>
                <nav className={"flex justify-between px-100 pt-4"}>
                    <Link to={"/reviews"}>Reviews</Link>
                    <Link to={"/reviews/create"}>Schrijf review</Link>
                    <Link to={"/games/create"}>Voeg game toe</Link>
                </nav>
            </header>

            <main className={"w-screen"}>
                <Outlet/>
            </main>

            <footer className={"text-center p-2 border-t-5 border-blue-700 bg-blue-400"}>
                <h2 className={"text-3xl font-bold"}>Epic</h2>
            </footer>
        </div>
    )
}

export default Layout