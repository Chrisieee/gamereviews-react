import {Link, useNavigate} from "react-router"

function Review({item}) {
    const navigate = useNavigate()

    return (
        <article onClick={() => navigate(`/reviews/${item.id}`)}
                 className={item.favorite ? ("border-5 border-blue-700 p-2 rounded-2xl bg-blue-600 hover:ease-in-out hover:bg-blue-700") : "border-5 border-blue-700 p-2 rounded-2xl bg-blue-400 hover:ease-in-out hover:bg-blue-500"}>
            <h2 className={"text-2xl font-bold"}>{item.title}</h2>
            <p className={"text-1xl"}>Door: {item.player}</p>
        </article>
    )
}

export default Review