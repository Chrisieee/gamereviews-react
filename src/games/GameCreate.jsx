import {useNavigate} from "react-router"
import {useGenres} from "../context/GenreContext.jsx"
import {useGames} from "../context/GameContext.jsx";

function GameCreate() {
    const navigate = useNavigate()
    const {genres} = useGenres()
    const {formData, setFormData, createGame, succes, setSucces} = useGames()

    const inputHandler = (e) => {
        const {name, value, multiple, options} = e.target
        if (multiple) {
            const selectedValues = Array.from(options)
                .filter(option => option.selected)
                .map(option => option.value)
            setFormData({
                ...formData,
                [name]: selectedValues,
            })
        } else {
            setFormData({
                ...formData,
                [name]: value,
            })
        }
    }

    const formHandler = (e) => {
        e.preventDefault()
        createGame(formData)
    }

    if (succes) {
        navigate("/reviews/create")
        setSucces(false)
    }

    return (
        <>
            <section className={"py-5 text-center w-3/4 m-auto border-5 border-blue-700 p-2 rounded-2xl bg-blue-400"}>
                <h2 className={"text-3xl font-bold"}>Voeg een game toe:</h2>
                <form className={"text-left flex flex-col gap-2"} onSubmit={formHandler}>
                    <div className={"flex flex-col"}>
                        <label className={"text-2xl font-bold"} htmlFor="title">Titel:</label>
                        <input className={"bg-blue-500 p-2"} type="text" name="title" id="title"
                               value={formData.title} onChange={inputHandler}/>
                    </div>
                    <div className={"flex flex-col"}>
                        <label className={"text-2xl font-bold"} htmlFor="genres">Genres:</label>
                        <select multiple onChange={inputHandler} className={"bg-blue-500 p-2"} name="genres"
                                id="genres">
                            {
                                genres ? genres.map((genre) =>
                                        <option key={genre._id} value={genre._id}>{genre.name}</option>) :
                                    <option>genres worden geladen</option>
                            }
                        </select>
                    </div>
                    <div className={"flex flex-col"}>
                        <button className={"bg-blue-500 p-2 font-bold hover:ease-in-out hover:bg-blue-600"}
                                type="submit">Voeg toe
                        </button>
                    </div>
                </form>
            </section>
        </>
    )

}

export default GameCreate