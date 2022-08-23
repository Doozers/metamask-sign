import "../index.css";
import Navbar from "../components/navbar.tsx";
import {useEffect} from "react";
import { useNavigate } from 'react-router-dom';

function Sign() {
    const naviguate = useNavigate();

    useEffect(() => {
        const nonce = new URLSearchParams(window.location.search).get('nonce');
        console.log("here is",nonce);
        if (nonce === null) {
            return
        }
        naviguate('/' + nonce);
    });

    return (
        <div className="App">
            <Navbar/>
        </div>
    );
}

export default Sign;
