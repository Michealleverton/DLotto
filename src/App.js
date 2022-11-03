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

function App() {
  return (
    <div className="mybar">
      {/* <Mynav /> */}
      <Shrinknav />
      {/* <Listofplayers /> */}
      <Shibacontent />
      <Info />
      <Lotteries />
      <TransactionList />
      <Heartstrings />
      <Footer />
    </div>
  );
}

export default App;
