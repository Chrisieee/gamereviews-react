import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router"
import Layout from "./Layout.jsx"
import ReviewList from "./reviews/ReviewList.jsx"
import ReviewDetails from "./reviews/ReviewDetails.jsx"
import ReviewCreate from "./reviews/ReviewCreate.jsx"
import ReviewEdit from "./reviews/ReviewEdit.jsx"

function App() {
    const router = createBrowserRouter([
        {
            element: <Layout/>,
            children: [
                {
                    path: "/",
                    element: <ReviewList/>
                },
                {
                    path: "/reviews",
                    element: <ReviewList/>
                },
                {
                    path: "/reviews/:id",
                    element: <ReviewDetails/>
                },
                {
                    path: "/reviews/create",
                    element: <ReviewCreate/>
                },
                {
                    path: "/reviews/:id/edit",
                    element: <ReviewEdit/>
                },
                {
                    path: "/games/create",
                    element: <ReviewEdit/>
                },
            ]
        }
    ])

    return (
        <RouterProvider router={router}/>
    )
}

export default App
