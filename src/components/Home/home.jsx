import { useNavigate } from "react-router-dom"
import "./home.css"

export function Home(){

let navigate = useNavigate();

function handleRegister(){
    navigate('/register')
}

function handleLogin(){
    navigate('/login')
}

    return(
        <div className="container-fluid d-flex justify-content-center  align-items-center banner">
            <button className="btn btn-primary mx-2 m-5 p-3" onClick={handleLogin}>Login</button>
            <button className="btn btn-secondary p-3" onClick={handleRegister}>Register</button>
        </div>
    )
}