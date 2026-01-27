import {Link, Outlet, useLocation} from "react-router"
import {TransitionGroup, CSSTransition, SwitchTransition} from "react-transition-group";
import React, {useRef} from "react";

function Layout() {
    const location = useLocation()
    const nodeRefs = useRef(new Map())

    const getNodeRef = (key) => {
        if (!nodeRefs.current.has(key)) {
            nodeRefs.current.set(key, React.createRef())
        }
        return nodeRefs.current.get(key)
    }

    const nodeRef = getNodeRef(location.pathname)

    return (
        <div className={"h-screen flex flex-col justify-between w-screen"}>
            <header className={"text-center p-2 border-b-5 border-blue-700 bg-blue-400"}>
                <h1 className={"text-4xl font-bold"}>Welkom op deze pagina!</h1>
                <nav className={"flex justify-between w-2/4 mx-auto pt-4"}>
                    <Link className={"hover:underline"} to={"/reviews"}>Reviews</Link>
                    <Link className={"hover:underline"} to={"/review/create"}>Schrijf review</Link>
                    <Link className={"hover:underline"} to={"/games/create"}>Voeg game toe</Link>
                </nav>
            </header>

            <main className={"w-screen page"}>
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={location.pathname}
                        timeout={200}
                        classNames="route"
                        nodeRef={nodeRef}>
                        <div ref={nodeRef}>
                            <Outlet/>
                        </div>
                    </CSSTransition>
                </SwitchTransition>
            </main>

            <footer className={"text-center p-2 border-t-5 border-blue-700 bg-blue-400"}>
                <h2 className={"text-3xl font-bold"}>Epic</h2>
            </footer>
        </div>
    )
}

export default Layout