import {useNavigate} from "react-router"

function Modal({children}) {
    const navigate = useNavigate()

    return (
        <div className={"fixed inset-0 modal-backdrop z-1000 w-screen h-screen justify-center content-center"}
             onClick={() => navigate(-1)}>
            <div
                className={"w-3/4 h-3/4 m-auto"} onClick={e => e.stopPropagation()}>
                <button className={"fixed button-spacing"} onClick={() => navigate(-1)}>✕</button>
                {children}
            </div>
        </div>
    )
}

export default Modal