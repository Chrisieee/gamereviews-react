import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ReviewsProvider} from "./context/ReviewContext.jsx"
import {GamesProvider} from "./context/gameContext.jsx"
import {ApiProvider} from "./context/ApiContext.jsx"
import {FormProvider} from "./context/FormContext.jsx"
import {GenresProvider} from "./context/GenreContext.jsx";
import {BrowserRouter} from "react-router";

createRoot(document.getElementById('root')).render(
    <ApiProvider>
        <ReviewsProvider>
            <GamesProvider>
                <GenresProvider>
                    <FormProvider>
                        <StrictMode>
                            <BrowserRouter>
                                <App/>
                            </BrowserRouter>
                        </StrictMode>
                    </FormProvider>
                </GenresProvider>
            </GamesProvider>
        </ReviewsProvider>
    </ApiProvider>
)
