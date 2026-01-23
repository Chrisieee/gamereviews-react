import {createContext, useContext, useEffect, useState} from "react";
import {useApi} from "./ApiContext";

const ReviewsContext = createContext();

export function ReviewsProvider({children}) {
    const {apiFetch} = useApi();
    const [reviews, setReviews] = useState(null)
    const [review, setReview] = useState(null)
    const [succes, setSucces] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filterUri, setFilterUri] = useState("")

    const previousPageHandler = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const nextPageHandler = () => {
        if (page < totalPages) {
            setPage(page + 1)
        }
    }

    async function fetchReviews() {
        try {
            const data = await apiFetch(`/reviews/?page=${page}&limit=9${filterUri}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            })
            setTotalPages(data.pagination.totalPages)
            setReviews(data.items)
            console.log(data)
        } catch (e) {
            console.log(e.message)
        }
    }

    async function fetchDetails(id) {
        try {
            const data = await apiFetch(`/reviews/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            })
            setReview(data)
        } catch (e) {
            console.log(e.message)
        }
    }

    async function createReview(formData) {
        try {
            const data = await apiFetch(`/reviews`, {
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

    async function editReview(formData, id) {
        try {
            const data = await apiFetch(`/reviews/${id}`, {
                method: "PUT",
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

    async function favoriteReview(id) {
        try {
            await apiFetch(`/reviews/${id}`, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    favorite: "true"
                })
            })
            await fetchDetails(id)
        } catch (e) {
            console.log(e.message)
        }
    }

    async function deleteReview(id) {
        try {
            await apiFetch(`/reviews/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            })
            setSucces(true)
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <ReviewsContext.Provider
            value={{
                //variabele:
                reviews,
                review,
                succes, setSucces,
                page, setPage,
                totalPages, setTotalPages,
                filterUri, setFilterUri,

                //functies:
                //CRUD
                fetchReviews,
                fetchDetails,
                favoriteReview,
                deleteReview,
                createReview,
                editReview,
                //pagination en filters
                previousPageHandler,
                nextPageHandler,
            }}>
            {children}
        </ReviewsContext.Provider>
    )
}

export function useReviews() {
    return useContext(ReviewsContext)
}