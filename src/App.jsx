import './index.css'
import {Route, Routes, useLocation} from "react-router"
import Layout from "./Layout.jsx"
import ReviewList from "./reviews/ReviewList.jsx"
import ReviewDetails from "./reviews/ReviewDetails.jsx"
import ReviewCreate from "./reviews/ReviewCreate.jsx"
import ReviewEdit from "./reviews/ReviewEdit.jsx"
import GameCreate from "./games/GameCreate.jsx";
import ErrorPage from "./Error.jsx";
import Modal from "./Modal.jsx";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import {useRef} from "react";

function App() {
    const location = useLocation()
    const backgroundLocation = location.state?.backgroundLocation || location
    const nodeRef = useRef(null)
    console.log("location.state:", location.state)
    console.log("location:", location)

    return (
        <>
            <Routes location={backgroundLocation}>
                <Route element={<Layout/>}>
                    <Route path="/" element={<ReviewList/>}/>
                    <Route path="/reviews" element={<ReviewList/>}/>
                    <Route path="/review/create" element={<ReviewCreate/>}/>
                    <Route path="/reviews/:id" element={<ReviewList/>}/>
                    <Route path="/reviews/:id/edit" element={<ReviewEdit/>}/>
                    <Route path="/games/create" element={<GameCreate/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Route>
            </Routes>

            {backgroundLocation && location.pathname.startsWith("/reviews/") && (
                <Routes>
                    <Route
                        path="/reviews/:id"
                        element={
                            <Modal>
                                <ReviewDetails/>
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </>
    )
}

export default App
