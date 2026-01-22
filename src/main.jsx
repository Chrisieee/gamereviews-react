import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ReviewsProvider} from "./context/ReviewContext.jsx";
import {GamesProvider} from "./context/gameContext.jsx";
import {ApiProvider} from "./context/ApiContext.jsx";

createRoot(document.getElementById('root')).render(
    <ApiProvider>
        <ReviewsProvider>
            <GamesProvider>
                <StrictMode>
                    <App/>
                </StrictMode>,
            </GamesProvider>
        </ReviewsProvider>
    </ApiProvider>
)
