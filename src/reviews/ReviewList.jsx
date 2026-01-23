import Review from "./Review.jsx";
import {useReviews} from "../context/ReviewContext.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useGenres} from "../context/GenreContext.jsx";

function ReviewList() {
    const {
        reviews,
        fetchReviews,
        page,
        totalPages,
        previousPageHandler,
        nextPageHandler,
        setFilterUri,
        filterUri
    } = useReviews();
    const {genres, fetchGenres} = useGenres()
    const [filterData, setFilterData] = useState({
        favorite: "",
        genres: []
    })

    useEffect(() => {
        fetchReviews(page)
        fetchGenres()
    }, [page]);

    const inputHandler = (e) => {
        const {name, checked, multiple, options} = e.target
        if (multiple) {
            const selectedValues = Array.from(options)
                .filter(option => option.selected)
                .map(option => option.value)
            setFilterData({
                ...filterData,
                [name]: selectedValues,
            })
        } else {
            setFilterData({
                ...filterData,
                [name]: checked,
            })
        }
    }

    const filterHandler = (e) => {
        e.preventDefault()
        if (filterData.genres.length > 0 && filterData.favorite) {
            setFilterUri(`&genres=${filterData.genres}&favorite=true`)
        } else if (filterData.genres.length > 0) {
            setFilterUri(`&genres=${filterData.genres}`)
        } else if (filterData.favorite) {
            setFilterUri(`&favorite=true`)
        }
    }

    const resetFilters = () => {
        setFilterUri("")
    }

    useEffect(() => {
        fetchReviews()
    }, [filterUri])

    return (
        <>
            <section
                className={"mt-2 text-center w-3/4 m-auto border-5 border-blue-700 p-2 rounded-2xl bg-blue-400 flex justify-evenly gap-8 content-baseline"}>
                <form onSubmit={filterHandler}>
                    <div className={"flex justify-evenly gap-8 content-baseline"}>
                        <div className={"flex gap-2 "}>
                            <label className={"text-2xl font-bold"} htmlFor="genres">Genres:</label>
                            <select multiple onChange={inputHandler} className={"bg-blue-500 p-2 h-15"} name="genres"
                                    id="genres">
                                {
                                    genres ? genres.map((genre) =>
                                            <option key={genre._id} value={genre._id}>{genre.name}</option>) :
                                        <option>Genres worden geladen</option>
                                }
                            </select>
                        </div>
                        <div className={"flex gap-2 content-center"}>
                            <label className={"text-2xl font-bold"} htmlFor="favorite">Favoriete:</label>
                            <input className={"bg-blue-500 p-2"} type="checkbox" name="favorite" id="favorite"
                                   checked={filterData.favorite} onChange={inputHandler}/>
                        </div>
                        <div className={"flex flex-col"}>
                            <button
                                className={"rounded-2xl bg-blue-500 p-2 px-5 font-bold hover:ease-in-out hover:bg-blue-600"}
                                type="submit">Filter
                            </button>
                        </div>
                    </div>
                </form>
                <button className={"rounded-2xl bg-blue-500 p-2 px-5 font-bold hover:ease-in-out hover:bg-blue-600"}
                        onClick={resetFilters}>Reset filters
                </button>
            </section>

            <section className={"flex flex-col justify-center text-center gap-4 w-3/4 mx-auto my-2"}>
                {reviews ? (
                    <div className={"px-5 gap-2 grid grid-cols-3"}>
                        {
                            reviews.map((review) => <Review item={review} key={review.id}/>)
                        }
                    </div>
                ) : (
                    <p className={"text-2xl font-bold"}>Notities zijn aan het laden...</p>
                )}
            </section>

            <section className={"flex justify-center gap-5"}>
                <button
                    className={"mb-2 rounded-2xl bg-blue-400 p-2 px-5 font-bold hover:ease-in-out hover:bg-blue-500"}
                    onClick={previousPageHandler} disabled={page === 1}>⬅️ Vorige
                </button>
                <button
                    className={"mb-2 rounded-2xl bg-blue-400 p-2 px-5 font-bold hover:ease-in-out hover:bg-blue-500"}
                    onClick={nextPageHandler}
                    disabled={page === totalPages}>Volgende ➡️
                </button>
            </section>
        </>
    )
}

export default ReviewList