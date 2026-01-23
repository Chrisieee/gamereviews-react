import {useNavigate, useParams} from "react-router"
import {useReviews} from "../context/ReviewContext.jsx"
import {useGames} from "../context/GameContext.jsx"
import {useForm} from "../context/FormContext.jsx"
import {useEffect} from "react"

function ReviewEdit() {
    const navigate = useNavigate()
    const {succes, setSucces, editReview} = useReviews()
    const {games} = useGames()
    const params = useParams()
    const {formData, inputHandler, fetchDetails} = useForm()

    if (succes) {
        navigate("/reviews")
        setSucces(false)
    }

    const formHandlerEdit = (e) => {
        e.preventDefault()
        editReview(formData, params.id)
    }

    useEffect(() => {
        fetchDetails(params.id)
    }, []);

    return (
        <>
            <section className={"py-5 text-center w-3/4 m-auto border-5 border-blue-700 p-2 rounded-2xl bg-blue-400"}>
                <h2 className={"text-3xl font-bold"}>Bewerk de review:</h2>
                <form className={"text-left flex flex-col gap-2"} onSubmit={formHandlerEdit}>
                    <div className={"flex flex-col"}>
                        <label className={"text-2xl font-bold"} htmlFor="title">Titel:</label>
                        <input className={"bg-blue-500 p-2"} type="text" name="title" id="title"
                               value={formData.title} onChange={inputHandler}/>
                    </div>
                    <div className={"flex flex-col"}>
                        <label className={"text-2xl font-bold"} htmlFor="title">Game:</label>
                        <select value={formData.game._id} onChange={inputHandler} className={"bg-blue-500 p-2"}
                                name="game"
                                id="game">
                            {
                                games ? games.map((game) =>
                                        <option key={game._id} value={game._id}>{game.title}</option>) :
                                    <option>Games worden geladen</option>
                            }
                        </select>
                    </div>
                    <div className={"flex flex-col"}>
                        <label className={"text-2xl font-bold"} htmlFor="player">Auteur:</label>
                        <input className={"bg-blue-500 p-2"} type="text" name="player" id="player"
                               value={formData.player} onChange={inputHandler}/>
                    </div>
                    <div className={"flex flex-col"}>
                        <label className={"text-2xl font-bold"} htmlFor="playedConsole">Gespeeld op:</label>
                        <input className={"bg-blue-500 p-2"} type="text" name="playedConsole" id="playedConsole"
                               value={formData.playedConsole} onChange={inputHandler}/>
                    </div>
                    <div className={"flex flex-col"}>
                        <label className={"text-2xl font-bold"} htmlFor="review">Text:</label>
                        <input className={"bg-blue-500 p-2"} type="text" name="review" id="review"
                               value={formData.review} onChange={inputHandler}/>
                    </div>
                    <div className={"flex flex-col"}>
                        <button className={"bg-blue-500 p-2 font-bold hover:ease-in-out hover:bg-blue-600"}
                                type="submit">Bewerk
                        </button>
                    </div>
                </form>
            </section>
        </>
    )

}

export default ReviewEdit