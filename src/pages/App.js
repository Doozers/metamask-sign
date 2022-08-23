import "../index.css";
import Navbar from "../components/navbar.tsx";
import FormSign from "../components/form.js";

function BaseApp() {
    return (
        <div className="App">
            <Navbar/>
            <FormSign/>
        </div>
    );
}

export default BaseApp;
