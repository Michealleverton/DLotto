import './Mymain.css';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
// import Listofplayers from './Listofplayers'
// import EventListner from "./EventListner"
import Mynav from './Mynav'
import Shibacontent from "./Shibacontent"
import Lotteries from "./Lotteries"
import Pastevents from "./Pastevents"
import Footer from "./Footer"
import Info from "./info"
import Heartstrings from "./Heartstrings"

function App() {
  return (
    <div className="mybar">
      <Mynav />
      {/* <Listofplayers /> */}
      {/* <EventListner /> */}
      <Shibacontent />
      <Info />
      <Pastevents />
      <Lotteries />
      <Heartstrings />
      <Footer />
    </div>
  );
}

export default App;
