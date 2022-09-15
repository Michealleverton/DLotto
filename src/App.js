import './Mymain.css';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
// import Listofplayers from './Listofplayers'
import Mynav from './Mynav'
import Shibacontent from "./Shibacontent"
import Lotteries from "./Lotteries"
// import EventListner from "./EventListner"
// import TicketPurchases from "./TicketPurchases"
import Footer from "./Footer"
import Info from "./info"
import Heartstrings from "./Heartstrings"

function App() {
  return (
    <div className="mybar">
      <Mynav />
      {/* <Listofplayers /> */}
      <Shibacontent />
      <Info />
      {/* <EventListner /> */}
      {/* <TicketPurchases /> */}
      <Lotteries />
      <Heartstrings />
      <Footer />
    </div>
  );
}

export default App;
