import React from "react";
import "../index.css";
import Navbar from '../components/navbar';
import {useEffect} from "react";
import {hash256, sign} from "../utils/utils";

// env it
const URL = 'http://localhost:3000';

function Sign() {

    async function signNonce(nonce: string): Promise<string> {
        const hash = hash256(nonce);
        return await sign(hash)
    }

    useEffect(() => {
        const signIt = async (nonce: string) => {
            await signNonce(nonce).then((result: string) => {
                window.location.replace(callbackURL + '?sig=' + result);
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
            callbackURL = `${URL}/default`;
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
