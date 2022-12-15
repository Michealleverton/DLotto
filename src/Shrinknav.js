import { useEffect, useState } from "react"
import {
    connectWallet,
    getCurrentWalletConnected //import here
} from "./utils/interact.js"
import logoicon from "./assets/logoicon.gif"
import "./shrinknav.css"
import Gift from './assets/emoji-3d icons-glossy-3d-icons-moving-gift-72dpi-forPersonalUseOnly.gif'

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

    const api_url = process.env.REACT_APP_IPINFO_API_TOKEN
    const request = await fetch(api_url)
    const data = await request.json()

    if (blacklist_countries.includes(data.country)) {
        // If the visitors ip country code is in blacklist this will redirect them to the 
        // access denied page
        window.location.href = "https://restrictcustomers.netlify.app"
        // display_access_denied_error() // Access denied error
    }
}

getLocationData()

const Shrinknav = (props) => {

    //State variables
    const [walletAddress, setWallet] = useState("")
    const [, setStatus] = useState("")

    function addWalletListener() {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setWallet(accounts[0])
                    setStatus("👆🏽 Write a message in the text-field above.")
                    sessionStorage.setItem("address connected", accounts[0])
                    localStorage.setItem("address connected", accounts[0])
                    sessionStorage.removeItem("verification")
                    window.location.reload()
                } else {
                    setWallet("")
                    setStatus("🦊 Connect to Metamask using the top right button.")
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
            const { address, status } = await getCurrentWalletConnected()
            setWallet(address)
            setStatus(status)
            addWalletListener()
            localStorage.setItem("address connected", address)
            localStorage.setItem("Api Node", "odticketv2")
            localStorage.setItem("Transaction Title", "One Dollar Tickets")
        }
        fetchData()
    }, [])

    const connectWalletPressed = async () => {
        const walletResponse = await connectWallet()
        setStatus(walletResponse.status)
        setWallet(walletResponse.address)
        localStorage.setItem("address connected", walletResponse.address)
        localStorage.setItem("Api Node", "odticketv2")
        setGateKeeping(1)
    };

    window.onscroll = function () {
        var nav = document.getElementById('navbar')
        if (window.pageYOffset > 50) {
            nav.classList.add("scrollNav")
        } else {
            nav.classList.remove("scrollNav")
        }
    }

    // Navbar html to display App itmes

    const [toggle, setToggle] = useState(false)
    const [walletconnect, setWalletconnect] = useState('')
    // this is a state used on first connect so that the admin button doesn't appear
    // on the first click of the connect button to connect to wallet for first time
    const [gateKeeping, setGateKeeping] = useState(0)

    const handleClick = () => {
        setWalletconnect(process.env.REACT_APP_OWNER)

        if (walletconnect === walletAddress) {
            setToggle(!toggle);
        } else {
            console.log("You are not authorized")
        }

    };

    return (
        <section className="fixed-top px-5 bg_blue bottomblackline myshadow-lg" >

            <nav id="navbar">
                <div className="nav-content">
                    <div>                    
                        <a href='#/'><img alt="" className="logo" src={logoicon} /></a>
                    </div>
                    <div className="ms-4 mr_auto fillspace">
                        <h2 className="companyname-adjust mb-0 display-6 fw-bolder">Decentraliz Lottery<br /></h2>
                        <p className="slogan-adjust mt-0 mb-2 sitelightblue textleft">The Only Crypto Lottery You Need</p>
                    </div>
                    {/* <div>
                        <ul>
                        <li><a href="#home" className="mynavlinks nav-link px-2">HOME</a></li>
                        <li><a href="#tickets" className="mynavlinks nav-link px-2">TICKETS</a></li>
                        <li><a href="#mytickets" className="mynavlinks nav-link px-2">MY TICKETS</a></li>
                        <li><a href="#specialdraws" className="mynavlinks nav-link px-2">SPECIAL DRAWS</a></li>
                        </ul>
                    </div> */}



                    <div id="btnholder" className="btn-adjust gap-md-1">

                        <div style={{ display: toggle ? 'block' : 'none' }}>
                            <button className="mybtn btn-warning2 px-4 py-2" type="button">
                                <a className="btncleanlinks" href="http://localhost:3001/">
                                    admin Panel
                                </a>
                            </button>
                        </div>
                        <div><img alt="" className="Gift" src={Gift} /></div>
                        <button className="mybtn btn-warning2 px-4 py-2"
                            onClick={() => {
                                if (gateKeeping === 1) {
                                    handleClick()
                                }
                                connectWalletPressed()
                            }}>
                            {walletAddress.length > 0 ? (
                                "Account: " +
                                String(walletAddress).substring(0, 6) +
                                "..." +
                                String(walletAddress).substring(38)
                            ) : (
                                <span>Connect Wallet</span>
                            )}
                        </button>
                        <div>
                        </div>
                    </div>
                </div>

                <div><a href="#home" className="backtotop"><i className="byebye fa-solid fa-arrow-up-from-bracket"></i></a></div>

            </nav>



        </section>
    );
};

export default Shrinknav;
