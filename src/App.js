import './Mymain.css';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// import Listofplayers from './Listofplayers'
// import Mynav from './Mynav'
import Shrinknav from './Shrinknav'
import Shibacontent from "./Shibacontent"
import Lotteries from "./Lotteries"
import TransactionList from "./transactions/TransactionList"
import Footer from "./Footer"
import Info from "./info"
import Heartstrings from "./Heartstrings"
import Waveseperator from "./waveseporator/Waveseperator"
import Singlewave from "./waveseporator/Singlewave"
// import Whitesteps from './waveseporator/Whitesteps'
import { createContext, useState } from "react"
import ReactSwitch from "react-switch"

export const ThemeContext = createContext(null)

function App() {
  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"))
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="mybar" id={theme}>

        {/* <Mynav /> */}
        <Shrinknav />
        {/* <Listofplayers /> */}
        <Shibacontent />
        <Info />
        <Lotteries />
        <TransactionList />
        {/* <Whitesteps /> */}
        <Singlewave />
        <Heartstrings />
        <Waveseperator />
        <Footer />
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
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
