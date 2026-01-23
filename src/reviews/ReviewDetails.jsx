import {Link, useNavigate, useParams} from "react-router"
import {useEffect} from "react"
import {useReviews} from "../context/ReviewContext.jsx";

function ReviewDetails() {
    const {review, fetchDetails, favoriteReview, deleteReview, succes} = useReviews()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        fetchDetails(params.id)
    }, [params.id])

    if (succes) {
        navigate("/reviews")
    }

    return (
        <section
            className={"border-5 border-blue-700 p-2 rounded-2xl bg-blue-400 w-3/4 mx-auto h-175"}>
            {review ? (
                <div className={"w-full flex flex-col justify-between h-full"}>
                    <div className={"flex flex-col gap-2"}>
                        <h2 className={"text-4xl font-bold text-center"}> {review.title} </h2>
                        <h3 className={"text-3xl font-bold text-center"}> {review.game.title} </h3>
                        <div className={"flex justify-center gap-5"}>
                            <p className={"text-2xl"}>Genres:</p>
                            {
                                review.game.genres.map((genre) => <p className={"text-2xl"}
                                                                     key={genre.id}>{genre.name}</p>)
                            }
                        </div>
                        <div className={"flex gap-5 justify-center"}>
                            <p className={"text-1xl underline"}> Door: {review.player}</p>
                            <p className={"text-1xl"}> Gespeeld op: {review.playedConsole}</p>
                        </div>
                    </div>
                    <p className={"text-1xl p-10"}> {review.review}</p>
                    <div className={"flex text-center mt-5 gap-10 justify-center"}>
                        <Link className={"hover:underline"} to={`/reviews/${review.id}/edit`}>✏️ Bewerk deze
                            notitie</Link>
                        <button className={"hover:underline"} type="button" onClick={() => deleteReview(review.id)}>
                            ❌ Review verwijderen
                        </button>
                        <button className={"hover:underline"} type="button" onClick={() => favoriteReview(review.id)}>
                            {review.favorite ? "❌ Favorite verwijderen" : "⭐ Favorite toevoegen"}</button>
                    </div>
                </div>
            ) : (
                <p className={"text-2xl font-bold text-center"}> Review is aan het laden of bestaat niet.</p>
            )}
        </section>
    )
}

export default ReviewDetails