import {createContext, useContext, useEffect, useState} from "react";
import {useApi} from "./ApiContext";

const GamesContext = createContext();

export function GamesProvider({children}) {
    const {apiFetch} = useApi();
    const [games, setGames] = useState(null)
    const [succes, setSucces] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        genres: []
    })

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

    async function createGame(formData) {
        try {
            const data = await apiFetch("/games", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            if (!data.message) {
                setSucces(true)
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        fetchGames()
    }, []);

    return (
        <GamesContext.Provider value={{games, fetchGames, succes, setSucces, createGame, formData, setFormData}}>
            {children}
        </GamesContext.Provider>
    )
}

export function useGames() {
    return useContext(GamesContext)
}