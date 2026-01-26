import {createContext, useContext} from "react"

const ApiContext = createContext()

const BASE_URL = "http://145.24.237.28:8000"

export function ApiProvider({children}) {
    async function apiFetch(endpoint, options = {}) {
        const res = await fetch(BASE_URL + endpoint, {
            headers: {
                ...options.headers,
            },
            ...options,
        })

        const text = await res.text()
        return text ? JSON.parse(text) : null
    }

    return (
        <ApiContext.Provider value={{apiFetch}}>
            {children}
        </ApiContext.Provider>
    );
}

export function useApi() {
    return useContext(ApiContext)
}