import './Mymain.css';
import './styles.css';
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
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const apiNode = localStorage.getItem("Api Node")
console.log(apiNode)

const client = new ApolloClient({
  uri: `https://api.thegraph.com/subgraphs/name/michealleverton/${apiNode}`,
  cache: new InMemoryCache(),
});

export const ThemeContext = createContext(null)

function App() {
  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"))
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ApolloProvider client={client}>
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

              <div className="">
                <i className="fa-sharp fa-solid fa-sun social-media-icons-white-switch"></i>
                <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
                <i className="fa-sharp fa-solid fa-moon social-media-icons-white-switch"></i>
              </div>
            </div>
          </div>
        </div>
      </ApolloProvider>
    </ThemeContext.Provider>
  );
}

export default App;
