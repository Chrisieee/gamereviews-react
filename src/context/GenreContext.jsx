import {createContext, useContext, useEffect, useState} from "react";
import {useApi} from "./ApiContext";

const GenresContext = createContext();

export function GenresProvider({children}) {
    const {apiFetch} = useApi();
    const [genres, setGenres] = useState(null)

    async function fetchGenres() {
        try {
            const data = await apiFetch("/genres", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                }
            })
            // console.log(data)
            await setGenres(data)
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        fetchGenres()
    }, []);

    return (
        <GenresContext.Provider value={{genres, fetchGenres}}>
            {children}
        </GenresContext.Provider>
    )
}

export function useGenres() {
    return useContext(GenresContext)
}