import {useState} from "react";
import hexer from 'browser-string-hexer';
import {sha256} from "js-sha256";

const React = require('react');

export default function FormSign({fixed}) {
    const [message, setMessage] = useState('');
    const [hash, setHash] = useState('');
    const [signature, setSignature] = useState('');

    function hash256() {
        setHash(sha256(message))
    }

    async function sign() {
        // @ts-ignore
        if (typeof window.ethereum === 'undefined') {
            console.log("no eth found")
            return;
        }
        const ethereum = window.ethereum;

        console.log('sign ' + hash);
        // @ts-ignore
        const accounts = await ethereum.request({method: 'eth_requestAccounts'})
        console.log(accounts)
        let msgParam = hexer(hash);
        console.log(msgParam)
        let param = [msgParam, accounts[0]];
        console.log(param);
        // @ts-ignore
        ethereum.request({
            method: 'personal_sign',
            params: param,
            id: 0
        }).then((result) => {
            console.log("HERE: ", result);
            setSignature(result);
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleChangeMessage = event => {
        setMessage(event.target.value);
    };

    const handleChangeHash = event => {
        setMessage(event.target.value);
    };

    return (
        <span className="inline-block align-middle ...">
            <form className="w-full max-w-sm" onSubmit={hash256}>
            <div className="flex items-center border-b border-teal-500 py-2">
                <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text" placeholder="to hash" aria-label="Full name" value={message} onChange={handleChangeMessage}/>
                <button
                    className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    type="button" onClick={hash256}>
                    sha256
                </button>
            </div>
        </form>
        <form className="w-full max-w-sm" onSubmit={sign}>
            <div className="flex items-center border-b border-teal-500 py-2">
                <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text" placeholder="to sign" aria-label="Full name" value={hash} onChange={handleChangeHash}/>
                <button
                    className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    type="button" onClick={sign}>
                    Sign
                </button>
            </div>
        </form>
             <div>{signature}</div>
        </span>
    )
}
