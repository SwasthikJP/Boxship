
import './App.css';
import Footer from './components/footer';
import Shippingform from './components/form';
import Navbar from './components/navbar';
import Table from './components/table';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";


function App() {
  return (
    <div>
   
      <Router>
        <Switch>

          <Route exact path='/'>
          <Navbar />
<Shippingform />
<Footer />
          </Route>

          <Route path='/orders'>
          <Navbar />
<Table />
<Footer />
          </Route>
        </Switch>
        </Router>

    </div>
  );
}

export default App;
