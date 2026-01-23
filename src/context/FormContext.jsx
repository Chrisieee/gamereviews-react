import {createContext, useContext, useState} from "react";
import {useReviews} from "./ReviewContext.jsx";
import {useApi} from "./ApiContext.jsx";

const FormContext = createContext();

export function FormProvider({children}) {
    const {createReview} = useReviews()
    const {apiFetch} = useApi();

    const [formData, setFormData] = useState({
        title: "",
        game: "",
        player: "",
        playedConsole: "",
        review: ""
    })

    async function fetchDetails(id) {
        try {
            const data = await apiFetch(`/reviews/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            })
            setFormData(data)
        } catch (e) {
            console.log(e.message)
        }
    }

    const inputHandler = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const formHandler = (e) => {
        e.preventDefault()
        createReview(formData)
    }

    return (
        <FormContext.Provider value={{formData, inputHandler, formHandler, fetchDetails}}>
            {children}
        </FormContext.Provider>
    );
}

export function useForm() {
    return useContext(FormContext);
}