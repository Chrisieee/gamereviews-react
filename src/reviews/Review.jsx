import {Link, useLocation, useNavigate} from "react-router"
import {useReviews} from "../context/ReviewContext.jsx";

function Review({item}) {
    const {favoriteReview} = useReviews()
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <article onClick={() => navigate(`/reviews/${item.id}`, {
            state: {backgroundLocation: location}
        })}
                 className={item.favorite ? ("border-5 border-blue-700 p-2 rounded-2xl bg-blue-600 hover:ease-in-out hover:bg-blue-700") : "border-5 border-blue-700 p-2 rounded-2xl bg-blue-400 hover:ease-in-out hover:bg-blue-500"}>
            <h2 className={"text-3xl font-bold"}>{item.title}</h2>
            <h3 className={"text-2xl font-bold text-center"}> {item.game.title} </h3>
            <div className={"flex justify-center gap-5"}>
                <p className={"text-1xl"}>Genres:</p>
                {
                    item.game.genres.map((genre) => <p className={"text-1xl"} key={genre.id}>{genre.name}</p>)
                }
            </div>
            <p className={"text-1xl"}>Door: {item.player}</p>
            <button className={"hover:underline"} type="button" onClick={() => favoriteReview(item.id)}>
                {item.favorite ? "❌ Favorite verwijderen" : "⭐ Favorite toevoegen"}</button>
        </article>
    )
}

export default Review