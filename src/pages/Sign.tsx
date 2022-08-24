import React from "react";
import "../index.css";
import Navbar from '../components/navbar';
import {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {hash256, sign} from "../utils/utils";

function Sign() {
    const navigate = useNavigate();

    async function signNonce(nonce: string): Promise<string> {
        const hash = hash256(nonce);
        return await sign(hash)
    }

    useEffect(() => {
        const signIt = async (nonce: string) => {
            await signNonce(nonce).then((result: string) => {
                navigate("../" + callbackURL + '?sig=' + result);
            }).catch(err => {
                console.error(err);
            });
        }

        const nonce = new URLSearchParams(window.location.search).get('nonce');
        let callbackURL = new URLSearchParams(window.location.search).get('callbackURL');

        if (nonce === null ) {
            console.error("no nonce found");
            return;
        }

        if (callbackURL === null) {
            callbackURL = "default/";
        }

        if (callbackURL[callbackURL.length - 1] !== '/') {
            callbackURL += '/';
        }

        signIt(nonce).then(() => console.log("redirected"));
    });

    return (
        <div className="App">
            <Navbar/>
        </div>
    );
}

export default Sign;
