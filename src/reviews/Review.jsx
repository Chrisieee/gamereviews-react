import {Link, useNavigate} from "react-router"

function Review({item}) {
    const navigate = useNavigate()

    return (
        <article onClick={() => navigate(`/reviews/${item.id}`)}
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
        </article>
    )
}

export default Review