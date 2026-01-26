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

function App() {
    const location = useLocation()
    const backgroundLocation = location.state?.backgroundLocation
    console.log("location.state:", location.state)

    return (
        <>
            <Routes location={backgroundLocation || location}>
                <Route element={<Layout/>}>
                    <Route path="/" element={<ReviewList/>} errorElement={<ErrorPage/>}/>
                    <Route path="/reviews" element={<ReviewList/>}/>
                    <Route path="/reviews/create" element={<ReviewCreate/>}/>
                    <Route path="/reviews/:id/edit" element={<ReviewEdit/>}/>
                    <Route path="/games/create" element={<GameCreate/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Route>
            </Routes>

            {backgroundLocation || location && (
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
