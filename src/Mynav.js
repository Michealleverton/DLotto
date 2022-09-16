import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected //import here
} from "./utils/interact.js";
import logoicon from "./assets/logoicon.gif";
import "./styles.css";
import "./Mymain.css";

/* ------------------------------------- */
/* ACCESS DENIED BY BLOCKED COUNTRY LIST */
/* ------------------------------------- */
/* ------------------- */
/* ACCESS DENIED ERROR */
/* ------------------- */
// eslint-disable-next-line
function display_access_denied_error() {
  document.body.innerHTML
    = '<div id="access-denied-error">'
    + '<div class="middle-center aligncenter">'
    + '<span class="pulsate-bck">'
    + '<i class="bi bi-exclamation-diamond-fill"></i>'
    + 'Access Denied! '
    + '</span>'
    + '</div>'
    + '</div>'
}

async function getLocationData() {

  // Blacklist countries
  const blacklist_countries = [
    // "CA", // Canada
    "BS", //Bahamas 
    "BY", // Belarus
    "CH", //Switzerland
    "CU", // Cuba
    "CY", // Cyprus
    "ID", // Indonesia
    "IN", // India
    "IR", // Iran
    "IQ", // Iraq
    "QA", // Qatar
    "SA", // Saudi Arabia
    "ZA", // South Africa
    "SY", // Syria
    "TR" // Turkey
  ]

  const api_url = process.env.REACT_APP_IPINFO_API_TOKEN;
  const request = await fetch(api_url);
  const data = await request.json();

  if (blacklist_countries.includes(data.country)) {
    // If the visitors ip country code is in blacklist this will redirect them to the 
    // access denied page
    window.location.href = "https://restrictcustomers.netlify.app";
    // display_access_denied_error() // Access denied error
  }
}

getLocationData();

const Mynav = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [, setStatus] = useState("");

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
          sessionStorage.setItem("address connected", accounts[0]);
          localStorage.setItem("address connected", accounts[0]);
          sessionStorage.removeItem("verification");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  useEffect(() => {
    async function fetchData() {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address)
      setStatus(status);
      addWalletListener();
    }
    fetchData();
  }, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  // Navbar html to display App itmes

  return (
    <header className="header sticky-top px-5 bg_blue bottomblackline myshadow-lg">
      <nav className="navbar navbar-expand-lg">
        <div className="mycontainer">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <img alt="" className="mylogo" src={logoicon} />
            <div className="ms-4">

              <h2 className="mt-1 mb-0 display-6 fw-bolder text-white">Decentraliz Lottery<br /></h2>
              <p className="mt-0 mb-2 sitelightblue textleft">The Only Crypto Lottery You Need</p>
            </div>
            <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-collapse text-center">
              <nav className="nav ms-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                {/* <li><a href="#home" className="mynavlinks nav-link px-2">HOME</a></li>
                            <li><a href="#tickets" className="mynavlinks nav-link px-2">TICKETS</a></li>
                            <li><a href="#mytickets" className="mynavlinks nav-link px-2">MY TICKETS</a></li>
                            <li><a href="#specialdraws" className="mynavlinks nav-link px-2">SPECIAL DRAWS</a></li> */}
              </nav>
              <div className="text-end">
                <button className="mybtn btn-warning2 px-4 py-2" onClick={connectWalletPressed}>
                  {walletAddress.length > 0 ? (
                    "Account: " +
                    String(walletAddress).substring(0, 6) +
                    "..." +
                    String(walletAddress).substring(38)
                  ) : (
                    <span>Connect Wallet</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Mynav;
