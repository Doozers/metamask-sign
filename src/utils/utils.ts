import {sha256} from "js-sha256";
// @ts-ignore
import hexer from "browser-string-hexer";

function hash256(message: string): string {
    return sha256(message)
}

async function sign(hash: string): Promise<string> {
    if (typeof (window as any).ethereum === 'undefined') {
        console.log("no eth found")
        return "";
    }
    const ethereum = (window as any).ethereum;

    const accounts = await ethereum.request({method: 'eth_requestAccounts'})
    let msgParam = hexer(hash);
    let param = [msgParam, accounts[0]];

    return ethereum.request({
        method: 'personal_sign',
        params: param,
        id: 0
    })
}

export {hash256, sign};