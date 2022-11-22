import './Mymain.css';
import './styles.css';
import React from 'react'
import { createContext, useState } from "react"
import ReactSwitch from "react-switch"

function Lightdarkswitch() {

    const [theme, setTheme] = useState("light")

    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"))
    }

    return (
        <div className="switch">
            <div>
                {/* <div>
              <label className="text-white p-2"> {theme === "light" ? "Light Mode" : "Dark Mode"} </label>
            </div> */}

                <div className="pb-2">
                    <i class="fa-sharp fa-solid fa-sun social-media-icons-white-switch"></i>
                    <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
                    <i class="fa-sharp fa-solid fa-moon social-media-icons-white-switch"></i>
                </div>
            </div>
        </div>
    )
}

export default Lightdarkswitch