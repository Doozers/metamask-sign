import {useEffect} from "react";

const React = require('react');

export default function Navbar({ fixed }) {
    const [ethereum, setEthereum] = React.useState(null);

    function connectMetamask() {
        console.log(ethereum.request({ method: 'eth_requestAccounts' }));
        console.log('connectMetamask');
    }

    useEffect(() => {
        // @ts-ignore
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
        }
        // @ts-ignore
        setEthereum(window.ethereum);
        // @ts-ignore
        //window.web3 = new web3(window.ethereum);
    });

    // @ts-ignore
    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-500 mb-3">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <a
                            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                            href={"/"}
                        >
                            Metamask-signature
                        </a>
                    </div>
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            <li className="nav-item">
                                <button type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
                                onClick={connectMetamask}>
                                    <svg className="mr-2 -ml-1 w-6 h-5" viewBox="0 0 2405 2501" fill="none" />
                                    { ethereum === null ? "Login with MetaMask" : ""}
                                </button>
                            </li>
                        </ul>
                    </div>
            </nav>
        </>
    );
}