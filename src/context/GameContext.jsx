import {createContext, useContext, useEffect, useState} from "react";
import {useApi} from "./ApiContext";
import {useNavigate} from "react-router";

const GamesContext = createContext();

export function GamesProvider({children}) {
    const {apiFetch} = useApi();
    const [games, setGames] = useState(null)

    async function fetchGames() {
        try {
            const data = await apiFetch("/games", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            })
            await setGames(data)
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        fetchGames()
    }, []);

    return (
        <GamesContext.Provider value={{games, fetchGames}}>
            {children}
        </GamesContext.Provider>
    )
}

export function useGames() {
    return useContext(GamesContext)
}